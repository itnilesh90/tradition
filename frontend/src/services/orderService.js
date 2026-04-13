import api from "./api";

export const createOrder = (payload) => api.post("/orders", payload);
export const fetchMyOrders = () => api.get("/orders/my");
export const fetchAllOrders = () => api.get("/orders");
export const updateOrderStatus = (id, payload) =>
  api.patch(`/orders/${id}/status`, payload);
