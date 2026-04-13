import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import orderReducer from "./slices/orderSlice";
import promoReducer from "./slices/promoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    promo: promoReducer,
  },
});

export default store;
