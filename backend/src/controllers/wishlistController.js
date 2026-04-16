import User from "../models/User.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    match: { isActive: true },
    populate: { path: "category", select: "name" },
  });

  res.json({ wishlist: user.wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product unavailable" });
  }

  const user = await User.findById(req.user._id);
  if (!user.wishlist.some((id) => id.toString() === productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  const populated = await user.populate({
    path: "wishlist",
    populate: { path: "category", select: "name" },
  });

  res.status(201).json({ wishlist: populated.wishlist });
});

export const removeWishlistItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.productId);
  await user.save();
  const populated = await user.populate({
    path: "wishlist",
    populate: { path: "category", select: "name" },
  });
  res.json({ wishlist: populated.wishlist });
});
