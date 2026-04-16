import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import { fetchCart, removeItemFromCart, updateCartQty } from "../store/slices/cartSlice";
import { formatCurrency } from "../utils/currency";
import useI18n from "../hooks/useI18n";

const CartPage = () => {
  const dispatch = useDispatch();
  const { t } = useI18n();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);
  const { items, subtotal, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const shipping = subtotal > 0 ? 79 : 0;
  const total = subtotal + shipping;

  const onUpdateQty = (productId, quantity) => {
    dispatch(updateCartQty({ productId, quantity }));
  };

  const onRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">{t("cart.title")}</h1>
      {loading ? (
        <Loader />
      ) : items.length === 0 ? (
        <EmptyState
          title={t("cart.emptyTitle")}
          description={t("cart.emptyDescription")}
          actionLabel={t("cart.startShopping")}
          actionTo="/products"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.product._id} item={item} onUpdateQty={onUpdateQty} onRemove={onRemove} />
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{t("cart.orderSummary")}</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>{t("cart.subtotal")}</span>
                <span>{formatCurrency(subtotal, { currency, language })}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("cart.shipping")}</span>
                <span>{formatCurrency(shipping, { currency, language })}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>{t("cart.total")}</span>
                <span>{formatCurrency(total, { currency, language })}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-5 block rounded-lg bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {t("cart.proceed")}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
