import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

const parseCsv = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    search = "",
    category = "",
    tags = "",
    sort = "newest",
  } = req.query;

  const query = { isActive: true };
  if (search) query.$text = { $search: search };

  if (category) {
    const categoryIds = parseCsv(category).filter((id) => mongoose.isValidObjectId(id));
    if (categoryIds.length > 0) query.category = { $in: categoryIds };
  }

  const tagList = parseCsv(tags).map((tag) => tag.toLowerCase());
  if (tagList.length > 0) query.tags = { $in: tagList };

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const sortMap = {
    newest: { createdAt: -1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    nameAsc: { title: 1 },
  };

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .sort(sortMap[sort] || sortMap.newest)
      .skip(skip)
      .limit(pageSize),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category", "name slug");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
});

export const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "name slug")
    .sort({ createdAt: -1 });
  res.json({ products });
});

export const getHomepageCollections = asyncHandler(async (req, res) => {
  const [newArrivals, ethnicCollection, accessories, handmade] = await Promise.all([
    Product.find({ isActive: true }).sort({ createdAt: -1 }).limit(12).populate("category", "name"),
    Product.find({ isActive: true, tags: { $in: ["ethnic", "shawl", "jewellery", "kurta"] } })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category", "name"),
    Product.find({ isActive: true, tags: { $in: ["accessories", "bag", "bracelet", "scarf", "scrunchies"] } })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category", "name"),
    Product.find({ isActive: true, tags: { $in: ["handmade", "home-decor", "diary", "tote-bag"] } })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category", "name"),
  ]);

  res.json({ newArrivals, ethnicCollection, accessories, handmade });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, stock, images, promoVideoUrl, tags, featured, isActive } =
    req.body;

  const categoryExists = await Category.exists({ _id: category });
  if (!categoryExists) return res.status(400).json({ message: "Invalid category" });

  const product = await Product.create({
    title,
    description,
    price,
    category,
    stock,
    images: Array.isArray(images) ? images : [],
    promoVideoUrl: promoVideoUrl || "",
    tags: Array.isArray(tags) ? tags.map((tag) => tag.toLowerCase()) : [],
    featured: !!featured,
    isActive: isActive ?? true,
  });

  res.status(201).json({ product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const updatable = [
    "title",
    "description",
    "price",
    "category",
    "stock",
    "images",
    "promoVideoUrl",
    "tags",
    "featured",
    "isActive",
  ];

  updatable.forEach((field) => {
    if (req.body[field] !== undefined) {
      if (field === "tags" && Array.isArray(req.body.tags)) {
        product.tags = req.body.tags.map((tag) => tag.toLowerCase());
      } else {
        product[field] = req.body[field];
      }
    }
  });

  await product.save();
  res.json({ product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.deleteOne();
  res.json({ message: "Product deleted" });
});
