import express from "express";
import { body } from "express-validator";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);
router.get("/", getWishlist);
router.post(
  "/",
  [body("productId").isMongoId().withMessage("Valid productId is required"), validateRequest],
  addToWishlist
);
router.delete("/:productId", removeWishlistItem);

export default router;
