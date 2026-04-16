import mongoose from "mongoose";

const promoVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    fallbackImage: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    section: {
      type: String,
      enum: ["hero", "brand-story"],
      default: "hero",
    },
  },
  { timestamps: true }
);

const PromoVideo = mongoose.model("PromoVideo", promoVideoSchema);

export default PromoVideo;
