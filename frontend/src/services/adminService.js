import api from "./api";

export const fetchDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data.stats;
};

export const getAdminProducts = async () => {
  const { data } = await api.get("/products/admin/all");
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.patch(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createCategory = async (payload) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await api.patch(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};

export const getAllPromoVideos = async () => {
  const { data } = await api.get("/promo-videos/admin/all");
  return data.videos;
};

export const createPromoVideo = async (payload) => {
  const { data } = await api.post("/promo-videos", payload);
  return data.promoVideo;
};

export const updatePromoVideo = async (id, payload) => {
  const { data } = await api.patch(`/promo-videos/${id}`, payload);
  return data.promoVideo;
};

export const deletePromoVideo = async (id) => {
  await api.delete(`/promo-videos/${id}`);
};
