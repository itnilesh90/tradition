import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.userId).select("-password");

  if (!user) {
    return res.status(401).json({ message: "Unauthorized. User not found." });
  }

  req.user = user;
  next();
});

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden. Admin access required." });
  }

  return next();
};
