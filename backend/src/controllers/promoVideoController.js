import PromoVideo from "../models/PromoVideo.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getActivePromoVideos = asyncHandler(async (req, res) => {
  const videos = await PromoVideo.find({ isActive: true }).sort({ updatedAt: -1 });
  res.json({ videos });
});

export const getAllPromoVideos = asyncHandler(async (req, res) => {
  const videos = await PromoVideo.find().sort({ updatedAt: -1 });
  res.json({ videos });
});

export const createPromoVideo = asyncHandler(async (req, res) => {
  const promoVideo = await PromoVideo.create(req.body);
  res.status(201).json({ promoVideo });
});

export const updatePromoVideo = asyncHandler(async (req, res) => {
  const promoVideo = await PromoVideo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!promoVideo) return res.status(404).json({ message: "Promo video not found" });
  res.json({ promoVideo });
});

export const deletePromoVideo = asyncHandler(async (req, res) => {
  const promoVideo = await PromoVideo.findById(req.params.id);
  if (!promoVideo) return res.status(404).json({ message: "Promo video not found" });
  await promoVideo.deleteOne();
  res.json({ message: "Promo video deleted" });
});
