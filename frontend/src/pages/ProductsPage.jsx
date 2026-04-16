import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import { fetchProducts } from "../store/slices/productSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import useI18n from "../hooks/useI18n";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { t } = useI18n();
  const { items: products, pagination, loading } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const page = Number(searchParams.get("page") || 1);
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page,
        limit: 12,
        category,
        search,
      })
    );
  }, [dispatch, page, category, search]);

  const totalPages = useMemo(
    () => Math.max(1, pagination.totalPages || 1),
    [pagination.totalPages]
  );

  const updateParams = (next) => {
    const merged = {
      page: 1,
      ...Object.fromEntries(searchParams.entries()),
      ...next,
    };
    Object.keys(merged).forEach((key) => {
      if (merged[key] === "" || merged[key] === null || merged[key] === undefined) {
        delete merged[key];
      }
    });
    setSearchParams(merged);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-3xl text-stone-900">{t("shop.title")}</h1>
      <p className="mt-2 text-stone-600">{t("shop.subtitle")}</p>

      <div className="mt-6 grid gap-4 rounded-2xl border border-stone-200 bg-white p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-stone-700">{t("nav.searchCta")}</label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateParams({ search: searchInput });
            }}
          >
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-500"
              placeholder={t("nav.searchPlaceholder")}
            />
          </form>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">{t("shop.category")}</label>
          <select
            value={category}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-500"
          >
            <option value="">{t("shop.allCategories")}</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader label="Fetching products..." />
      ) : products.length ? (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: Math.max(page - 1, 1) })}
              disabled={page <= 1}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              {t("common.prev")}
            </button>
            <span className="text-sm text-stone-600">
              {t("shop.pageOf", { page, totalPages })}
            </span>
            <button
              onClick={() =>
                setSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  page: Math.min(page + 1, totalPages),
                })
              }
              disabled={page >= totalPages}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              {t("common.next")}
            </button>
          </div>
        </>
      ) : (
        <EmptyState
          title={t("shop.emptyTitle")}
          description={t("shop.emptyDesc")}
        />
      )}
    </div>
  );
};

export default ProductsPage;
