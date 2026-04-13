import express from "express";
import { body } from "express-validator";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getCategories);

router.post(
  "/",
  protect,
  adminOnly,
  [body("name").trim().notEmpty().withMessage("Category name is required"), validateRequest],
  createCategory
);

router.patch("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
