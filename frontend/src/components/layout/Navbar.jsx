import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categorySlice";
import { logout } from "../../store/slices/authSlice";
import { fetchWishlist } from "../../store/slices/wishlistSlice";
import { setCurrency, setLanguage } from "../../store/slices/settingsSlice";
import { useI18n } from "../../hooks/useI18n";

const navLinkClass = ({ isActive }) =>
  `text-sm ${isActive ? "text-stone-900 font-semibold" : "text-stone-600"} hover:text-stone-900 transition-colors`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language, currency } = useI18n();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { items: categories } = useSelector((state) => state.categories);
  const { user, token } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  const navCategories = useMemo(
    () => categories.slice(0, 10),
    [categories]
  );

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (selectedCategory) params.set("category", selectedCategory);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-stone-900">
            {t("brand")}
          </Link>
          <nav className="hidden items-center gap-4 lg:flex">
            <NavLink to="/" className={navLinkClass}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              {t("nav.shop")}
            </NavLink>
            <NavLink to="/orders" className={navLinkClass}>
              {t("nav.orders")}
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/admin" className={navLinkClass}>
                {t("nav.admin")}
              </NavLink>
            )}
          </nav>
        </div>

        <form
          className="hidden flex-1 items-center gap-2 rounded-full border border-stone-300 px-3 py-2 md:flex md:max-w-xl"
          onSubmit={handleSearch}
        >
          <Search size={18} className="text-stone-500" />
          <input
            type="text"
            className="w-full border-0 bg-transparent text-sm outline-none"
            placeholder={t("nav.searchPlaceholder")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="rounded-full border border-stone-200 bg-white px-2 py-1 text-xs"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">{t("nav.allCategories")}</option>
            {navCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white"
          >
            {t("nav.search")}
          </button>
        </form>

        <div className="flex items-center gap-2">
          <select
            aria-label="Language"
            value={language}
            onChange={(event) => dispatch(setLanguage(event.target.value))}
            className="rounded-full border border-stone-200 bg-white px-2 py-1 text-xs"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
          <select
            aria-label="Currency"
            value={currency}
            onChange={(event) => dispatch(setCurrency(event.target.value))}
            className="rounded-full border border-stone-200 bg-white px-2 py-1 text-xs"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
          <Link
            to={user ? "/profile" : "/login"}
            className="rounded-full border border-stone-200 p-2 text-stone-700 hover:text-stone-900"
          >
            <UserRound size={18} />
          </Link>
          <Link
            to="/wishlist"
            className="relative rounded-full border border-stone-200 p-2 text-stone-700 hover:text-stone-900"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full border border-stone-200 p-2 text-stone-700 hover:text-stone-900"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {user && (
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="hidden rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 md:inline-flex"
            >
              {t("nav.logout")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
