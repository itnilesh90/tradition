import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import { fetchWishlist } from "../store/slices/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) {
    return <Loader label="Loading wishlist..." />;
  }

  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-5 w-5 text-orange-500" />
        <h1 className="text-3xl font-semibold text-gray-900">Wishlist</h1>
      </div>
      {!items.length ? (
        <EmptyState
          title="Wishlist is empty"
          description="Save products to compare styles and prices."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
