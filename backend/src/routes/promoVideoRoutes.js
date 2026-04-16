import express from "express";
import {
  createPromoVideo,
  deletePromoVideo,
  getActivePromoVideos,
  getAllPromoVideos,
  updatePromoVideo,
} from "../controllers/promoVideoController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getActivePromoVideos);

router.get("/admin/all", protect, adminOnly, getAllPromoVideos);
router.post("/", protect, adminOnly, createPromoVideo);
router.patch("/:id", protect, adminOnly, updatePromoVideo);
router.delete("/:id", protect, adminOnly, deletePromoVideo);

export default router;
