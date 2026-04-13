import api from "./api";

export const fetchProducts = (params = {}) => api.get("/products", { params });
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchHomeCollections = () => api.get("/products/collections/home");
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) => api.patch(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const fetchAdminProducts = () => api.get("/products/admin/all");
