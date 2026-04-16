import User from "../models/User.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

const cartProjection = "title price stock images category";

const enrichCart = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "cartItems.product",
    select: cartProjection,
    populate: { path: "category", select: "name" },
  });

  const items = user.cartItems
    .filter((item) => item.product)
    .map((item) => ({
      product: item.product,
      quantity: item.quantity,
      lineTotal: item.quantity * item.product.price,
    }));

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, subtotal };
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = await enrichCart(req.user._id);
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product unavailable" });
  }

  const user = await User.findById(req.user._id);
  const existing = user.cartItems.find((item) => item.product.toString() === productId);
  const desiredQty = Number(quantity);

  if (desiredQty < 1) return res.status(400).json({ message: "Quantity must be at least 1" });
  if (desiredQty > product.stock) return res.status(400).json({ message: "Not enough stock" });

  if (existing) {
    existing.quantity = Math.min(existing.quantity + desiredQty, product.stock);
  } else {
    user.cartItems.push({ product: productId, quantity: desiredQty });
  }

  await user.save();
  const cart = await enrichCart(req.user._id);
  res.status(201).json(cart);
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const qty = Number(quantity);
  if (qty < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

  const user = await User.findById(req.user._id);
  const cartItem = user.cartItems.find((item) => item.product.toString() === req.params.productId);
  if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

  const product = await Product.findById(req.params.productId);
  if (!product || qty > product.stock) return res.status(400).json({ message: "Invalid quantity" });

  cartItem.quantity = qty;
  await user.save();

  const cart = await enrichCart(req.user._id);
  res.json(cart);
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cartItems = user.cartItems.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await user.save();

  const cart = await enrichCart(req.user._id);
  res.json(cart);
});

export const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cartItems = [];
  await user.save();
  res.json({ items: [], subtotal: 0 });
});
