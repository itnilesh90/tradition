import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./app/AppRouter";
import { loadProfileThunk } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";
import { fetchWishlist } from "./store/slices/wishlistSlice";

function App() {
  const dispatch = useDispatch();
  const authDisabled = import.meta.env.VITE_AUTH_DISABLED === "true";
  const { token, initialized, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if ((authDisabled || token) && !initialized) {
      dispatch(loadProfileThunk());
    }
  }, [dispatch, token, initialized, authDisabled]);

  useEffect(() => {
    if (user && (authDisabled || token)) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, user, authDisabled]);

  return <AppRouter />;
}

export default App;
