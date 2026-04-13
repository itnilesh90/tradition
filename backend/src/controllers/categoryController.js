import Category from "../models/Category.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import slugify from "../utils/slugify.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, isActive } = req.body;
  const slug = slugify(name);
  const exists = await Category.findOne({ slug });
  if (exists) return res.status(409).json({ message: "Category already exists" });

  const category = await Category.create({
    name,
    slug,
    description: description || "",
    image: image || "",
    isActive: isActive ?? true,
  });

  res.status(201).json({ category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  const { name, description, image, isActive } = req.body;
  if (name) {
    category.name = name;
    category.slug = slugify(name);
  }
  if (description !== undefined) category.description = description;
  if (image !== undefined) category.image = image;
  if (isActive !== undefined) category.isActive = isActive;

  await category.save();
  res.json({ category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  const linkedProduct = await Product.findOne({ category: category._id });
  if (linkedProduct) {
    return res
      .status(400)
      .json({ message: "Cannot delete category with linked products" });
  }

  await category.deleteOne();
  res.json({ message: "Category deleted" });
});
