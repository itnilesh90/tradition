import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  defaultAddress: user.defaultAddress || null,
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const user = await User.create({ name, email, password });
  const token = signToken(user._id, user.role);
  return res.status(201).json({ token, user: safeUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id, user.role);
  return res.json({ token, user: safeUser(user) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: safeUser(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, defaultAddress } = req.body;

  if (name) user.name = name;
  if (defaultAddress) user.defaultAddress = defaultAddress;

  await user.save();
  res.json({ user: safeUser(user) });
});
