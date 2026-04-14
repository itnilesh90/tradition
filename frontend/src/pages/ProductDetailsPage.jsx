import { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import Loader from "../components/common/Loader";
import { formatCurrency } from "../utils/currency";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addWishlistItem } from "../store/slices/wishlistSlice";
import { useI18n } from "../hooks/useI18n";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const { t, language, currency } = useI18n();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts({ page: 1, limit: 50 }));
    }
  }, [dispatch, products.length]);

  const product = useMemo(
    () => products.find((item) => item._id === id),
    [products, id]
  );

  if (loading && !product) {
    return <Loader className="min-h-[40vh]" />;
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">{t("products.notFound")}</h1>
      </section>
    );
  }

  const onCart = () =>
    dispatch(
      addToCart({
        productId: product._id,
        quantity: qty
      })
    );

  const onWishlist = () => dispatch(addWishlistItem(product._id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} promoVideoUrl={product.promoVideoUrl} title={product.title} />

        <div>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase text-rose-800">
            {product.category?.name ?? t("products.allCategories")}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-2 text-2xl font-semibold text-rose-700">
            {formatCurrency(product.price, { currency, language })}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                #{tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {t("products.stockAvailable", { stock: product.stock })}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <input
              className="w-20 rounded-xl border border-gray-300 px-3 py-2"
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(event) => setQty(Number(event.target.value) || 1)}
            />
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              onClick={onCart}
              type="button"
            >
              <ShoppingCart size={16} />
              {t("products.addToCart")}
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              onClick={onWishlist}
              type="button"
            >
              <Heart size={16} />
              {t("products.wishlist")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
