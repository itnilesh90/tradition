import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import { fetchMyOrders } from "../store/slices/orderSlice";
import { formatCurrency } from "../utils/currency";
import useI18n from "../hooks/useI18n";

function OrdersPage() {
  const dispatch = useDispatch();
  const { t, language } = useI18n();
  const currency = useSelector((state) => state.settings.currency);
  const { myOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="font-serif text-3xl text-stone-800">{t("orders.title")}</h1>
      {loading ? (
        <Loader />
      ) : myOrders.length === 0 ? (
        <EmptyState
          title={t("orders.emptyTitle")}
          description={t("orders.emptyDescription")}
        />
      ) : (
        <div className="mt-6 space-y-4">
          {myOrders.map((order) => (
            <article
              key={order._id}
              className="rounded-xl border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-stone-600">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {order.orderStatus}
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-stone-700 md:grid-cols-3">
                <p>{t("orders.items")}: {order.items.length}</p>
                <p>{t("orders.total")}: {formatCurrency(order.totalAmount, { currency, language })}</p>
                <p>{t("orders.payment")}: {order.payment?.provider}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrdersPage;
