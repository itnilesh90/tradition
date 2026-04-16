import express from "express";
import { body } from "express-validator";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.delete("/", clearCart);

router.post(
  "/",
  [
    body("productId").isMongoId().withMessage("Valid productId is required"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validateRequest,
  ],
  addToCart
);

router.patch(
  "/:productId",
  [body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"), validateRequest],
  updateCartItem
);

router.delete("/:productId", removeCartItem);

export default router;
