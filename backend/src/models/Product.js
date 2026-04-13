import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, default: 0, min: 0 },
    images: [{ type: String, required: true }],
    promoVideoUrl: { type: String, default: "" },
    tags: [{ type: String, lowercase: true, trim: true }],
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", tags: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
