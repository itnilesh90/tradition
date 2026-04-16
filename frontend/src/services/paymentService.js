import api from "./api";

export const createStripeIntent = (payload) => api.post("/payments/stripe/create-intent", payload);
export const confirmStripePayment = (payload) => api.post("/payments/stripe/confirm", payload);

export const createPaymentIntent = createStripeIntent;
