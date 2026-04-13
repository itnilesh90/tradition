import asyncHandler from "../utils/asyncHandler.js";

export const uploadProductImages = asyncHandler(async (req, res) => {
  const files = req.files || [];
  const urls = files.map((file) => file.path || file.secure_url);
  res.status(201).json({ urls });
});

export const uploadPromoVideo = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "Video file is required" });
  res.status(201).json({ url: file.path || file.secure_url });
});
