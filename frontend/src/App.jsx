import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./app/AppRouter";
import { loadProfileThunk } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";
import { fetchWishlist } from "./store/slices/wishlistSlice";

function App() {
  const dispatch = useDispatch();
  const { token, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !initialized) {
      dispatch(loadProfileThunk());
    }
  }, [dispatch, token, initialized]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  return <AppRouter />;
}

export default App;
