import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/currency';
import {
  fetchAdminOrders,
  updateOrderStatus,
} from '../../store/slices/orderSlice';

const statusOptions = ['created', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

function AdminOrdersPage() {
  const dispatch = useDispatch();
  const { adminOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, nextStatus) => {
    await dispatch(updateOrderStatus({ orderId, payload: { orderStatus: nextStatus } }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Order Manager</h1>
        <p className="text-sm text-slate-600">Track status and process customer orders.</p>
      </div>

      {loading ? (
        <Loader label="Loading orders..." />
      ) : adminOrders.length ? (
        <div className="space-y-4">
          {adminOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">Order #{order._id.slice(-6)}</p>
                  <p className="text-xs text-slate-500">
                    {order.user?.name || 'Customer'} • {order.user?.email || 'No email'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-emerald-700">
                    {formatCurrency(order.totalAmount)}
                  </span>
                  <select
                    value={order.orderStatus}
                    onChange={(event) => handleStatusChange(order._id, event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
                  >
                    {statusOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No orders yet" description="Placed orders will appear here." />
      )}
    </div>
  );
}

export default AdminOrdersPage;
