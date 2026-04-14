import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createStripeIntent = asyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ message: "Stripe is not configured on server" });
  }

  const { orderId, currency = "EUR" } = req.body;
  const order = await Order.findOne({ _id: orderId, user: req.user._id });
  if (!order) return res.status(404).json({ message: "Order not found" });

  const normalizedCurrency = String(currency).toUpperCase();
  if (!["EUR", "USD"].includes(normalizedCurrency)) {
    return res.status(400).json({ message: "Only EUR and USD are supported" });
  }

  const amount = Math.round(order.totalAmount * 100);
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: normalizedCurrency.toLowerCase(),
    metadata: { orderId: String(order._id), userId: String(req.user._id) },
    automatic_payment_methods: { enabled: true },
  });

  order.payment.clientSecret = intent.client_secret;
  order.payment.transactionId = intent.id;
  order.payment.status = "requires_action";
  await order.save();

  res.json({
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
  });
});

export const markPaymentSuccess = asyncHandler(async (req, res) => {
  const { orderId, transactionId } = req.body;
  const order = await Order.findOne({ _id: orderId, user: req.user._id });
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.payment.status = "paid";
  if (transactionId) order.payment.transactionId = transactionId;
  order.orderStatus = "confirmed";
  await order.save();

  res.json({ order });
});
