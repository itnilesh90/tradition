import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { formatCurrency } from "../../utils/currency";
import useI18n from "../../hooks/useI18n";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language, currency } = useI18n();
  const { token } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  return (
    <article className="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product._id}`} className="block overflow-hidden">
        <img
          src={product.images?.[0] || "https://placehold.co/400x500?text=No+Image"}
          alt={product.title}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <Link to={`/products/${product._id}`} className="block">
            <h3 className="line-clamp-1 text-lg font-semibold text-stone-900">{product.title}</h3>
          </Link>
          <p className="line-clamp-2 text-sm text-stone-500">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-rose-700">
            {formatCurrency(product.price, { language, currency })}
          </p>
          <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">
            {product.category?.name || "Uncategorized"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(addToCart({ productId: product._id, quantity: 1 }))}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            <ShoppingCart size={16} />
            {t("common.addToCart")}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!token) {
                navigate("/login");
                return;
              }
              dispatch(toggleWishlistItem(product._id));
            }}
            className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 transition ${
              isWishlisted
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-stone-200 text-stone-700 hover:bg-stone-100"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
