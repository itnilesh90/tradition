import express from "express";
import { body } from "express-validator";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);
router.get("/my", getMyOrders);
router.post(
  "/",
  [
    body("shippingAddress.fullName").trim().notEmpty().withMessage("Full name is required"),
    body("shippingAddress.phone").trim().notEmpty().withMessage("Phone is required"),
    body("shippingAddress.line1").trim().notEmpty().withMessage("Address line1 is required"),
    body("shippingAddress.city").trim().notEmpty().withMessage("City is required"),
    body("shippingAddress.state").trim().notEmpty().withMessage("State is required"),
    body("shippingAddress.postalCode").trim().notEmpty().withMessage("Postal code is required"),
    body("paymentProvider").optional().isIn(["stripe", "razorpay", "cod"]),
    validateRequest,
  ],
  createOrder
);

router.get("/", adminOnly, getAllOrders);
router.patch("/:id/status", adminOnly, updateOrderStatus);

export default router;
