import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./app/AppRouter";
import { loadProfileThunk } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";
import { fetchWishlist } from "./store/slices/wishlistSlice";

function App() {
  const dispatch = useDispatch();
  const { token, initialized, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !initialized) {
      dispatch(loadProfileThunk());
    }
  }, [dispatch, token, initialized]);

  useEffect(() => {
    if (token && user) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, user]);

  return <AppRouter />;
}

export default App;
