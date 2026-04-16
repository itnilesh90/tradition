import { createSlice } from "@reduxjs/toolkit";

const LANGUAGE_KEY = "language";
const CURRENCY_KEY = "currency";

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
};

const sanitizeLanguage = (value) => (value === "fr" ? "fr" : "en");
const sanitizeCurrency = (value) => (value === "USD" ? "USD" : "EUR");

const initialState = {
  language: sanitizeLanguage(readStorage(LANGUAGE_KEY, "en")),
  currency: sanitizeCurrency(readStorage(CURRENCY_KEY, "EUR")),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = sanitizeLanguage(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_KEY, state.language);
      }
    },
    setCurrency(state, action) {
      state.currency = sanitizeCurrency(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENCY_KEY, state.currency);
      }
    },
  },
});

export const { setLanguage, setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
