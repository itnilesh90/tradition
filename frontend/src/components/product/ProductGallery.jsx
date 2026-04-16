import { useState } from "react";

const ProductGallery = ({ images = [], promoVideoUrl }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fallback = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000";
  const allImages = images.length ? images : [fallback];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white">
        <img
          src={allImages[activeIndex]}
          alt="product"
          className="h-[420px] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {allImages.map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className={`overflow-hidden rounded-lg border ${
              activeIndex === idx
                ? "border-amber-500"
                : "border-amber-100 hover:border-amber-300"
            }`}
          >
            <img src={image} alt="thumb" className="h-16 w-full object-cover" />
          </button>
        ))}
      </div>
      {promoVideoUrl && (
        <div className="overflow-hidden rounded-xl border border-amber-100 bg-black">
          <video controls className="h-56 w-full object-cover">
            <source src={promoVideoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
