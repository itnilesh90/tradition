import api from "./api";

export const getActivePromoVideos = async () => {
  const { data } = await api.get("/promo-videos");
  return data.videos;
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
