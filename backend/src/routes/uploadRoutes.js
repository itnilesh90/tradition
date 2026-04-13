import express from "express";
import { uploadImage, uploadVideo } from "../config/cloudinary.js";
import { uploadProductImages, uploadPromoVideo } from "../controllers/uploadController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/images",
  protect,
  adminOnly,
  uploadImage.array("images", 8),
  uploadProductImages
);
router.post("/video", protect, adminOnly, uploadVideo.single("video"), uploadPromoVideo);

export default router;
