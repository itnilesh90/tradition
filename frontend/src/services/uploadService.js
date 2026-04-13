import api from "./api";

export const uploadProductImages = (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  return api.post("/uploads/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadPromoVideo = (file) => {
  const formData = new FormData();
  formData.append("video", file);
  return api.post("/uploads/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
