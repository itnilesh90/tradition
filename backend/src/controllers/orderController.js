import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";

const SHIPPING_FEE = 79;

const createItemsFromCart = async (user) => {
  if (user.cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const items = [];
  for (const cartItem of user.cartItems) {
    const product = await Product.findById(cartItem.product);
    if (!product || !product.isActive) throw new Error("Some products are unavailable");
    if (cartItem.quantity > product.stock) throw new Error(`Stock too low for ${product.title}`);

    items.push({
      product: product._id,
      title: product.title,
      image: product.images[0] || "",
      price: product.price,
      quantity: cartItem.quantity,
    });
  }

  return items;
};

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentProvider = "stripe" } = req.body;
  const user = await User.findById(req.user._id);
  const items = await createItemsFromCart(user);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 ? 0 : SHIPPING_FEE;
  const totalAmount = subtotal + shippingFee;

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  const order = await Order.create({
    user: user._id,
    items,
    shippingAddress,
    subtotal,
    shippingFee,
    totalAmount,
    payment: { provider: paymentProvider, status: "pending" },
  });

  user.cartItems = [];
  if (shippingAddress) user.defaultAddress = shippingAddress;
  await user.save();

  res.status(201).json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json({ orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const { orderStatus, paymentStatus } = req.body;
  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.payment.status = paymentStatus;
  await order.save();

  res.json({ order });
});
