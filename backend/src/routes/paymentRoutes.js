import express from "express";
import { body } from "express-validator";
import { createStripeIntent, markPaymentSuccess } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);

router.post(
  "/stripe/create-intent",
  [body("orderId").isMongoId().withMessage("Valid orderId is required"), validateRequest],
  createStripeIntent
);

router.post(
  "/stripe/confirm",
  [body("orderId").isMongoId().withMessage("Valid orderId is required"), validateRequest],
  markPaymentSuccess
);

export default router;
