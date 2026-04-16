import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  getAdminProducts,
  deleteProduct,
  getHomepageCollections,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/collections/home", getHomepageCollections);
router.get("/admin/all", protect, adminOnly, getAdminProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  adminOnly,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be non-negative"),
    body("category").isMongoId().withMessage("Valid category is required"),
    body("stock").optional().isInt({ min: 0 }),
    body("images").isArray({ min: 1 }).withMessage("At least one image is required"),
    validateRequest,
  ],
  createProduct
);

router.patch("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
