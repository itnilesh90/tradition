import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../../services/adminService";
import { fetchCategories } from "../../services/categoryService";
import { formatCurrency } from "../../utils/currency";
import { useI18n } from "../../hooks/useI18n";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  images: "",
  promoVideoUrl: "",
  tags: "",
};

export default function AdminProductsPage() {
  const { language, currency } = useI18n();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const categoryOptions = useMemo(
    () => categories.map((category) => ({ label: category.name, value: category._id })),
    [categories],
  );

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAdminProducts(),
          fetchCategories(),
        ]);
        setProducts(productsResponse.products ?? []);
        setCategories(categoriesResponse.data.categories ?? []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ?? "Unable to load products for admin.",
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const resetForm = () => {
    setEditingId("");
    setForm(initialState);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category?._id ?? "",
      stock: product.stock,
      images: (product.images ?? []).join(", "),
      promoVideoUrl: product.promoVideoUrl ?? "",
      tags: (product.tags ?? []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
      images: form.images
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      promoVideoUrl: form.promoVideoUrl || undefined,
      tags: form.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        const response = await updateProduct(editingId, payload);
        setProducts((current) =>
          current.map((item) =>
            item._id === editingId ? response.product : item,
          ),
        );
      } else {
        const response = await createProduct(payload);
        setProducts((current) => [response.product, ...current]);
      }
      resetForm();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? "Unable to save product.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const deleteHandler = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(productId);
      setProducts((current) => current.filter((item) => item._id !== productId));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? "Unable to delete product.",
      );
    }
  };

  return (
    <>
      <h1 className="font-display text-3xl text-brand-charcoal">Product Manager</h1>

      <form
        onSubmit={submitHandler}
        className="mt-6 grid gap-4 rounded-2xl border border-brand-beige bg-white p-4 md:grid-cols-2"
      >
        <input
          required
          className="rounded-lg border border-brand-beige px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
        />
        <select
          required
          className="rounded-lg border border-brand-beige px-3 py-2"
          value={form.category}
          onChange={(event) =>
            setForm((current) => ({ ...current, category: event.target.value }))
          }
        >
          <option value="">Select category</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          required
          type="number"
          min="1"
          className="rounded-lg border border-brand-beige px-3 py-2"
          placeholder="Price"
          value={form.price}
          onChange={(event) =>
            setForm((current) => ({ ...current, price: event.target.value }))
          }
        />
        <input
          required
          type="number"
          min="0"
          className="rounded-lg border border-brand-beige px-3 py-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(event) =>
            setForm((current) => ({ ...current, stock: event.target.value }))
          }
        />
        <textarea
          required
          className="rounded-lg border border-brand-beige px-3 py-2 md:col-span-2"
          rows={3}
          placeholder="Description"
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
        />
        <input
          required
          className="rounded-lg border border-brand-beige px-3 py-2 md:col-span-2"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={(event) =>
            setForm((current) => ({ ...current, images: event.target.value }))
          }
        />
        <input
          className="rounded-lg border border-brand-beige px-3 py-2 md:col-span-2"
          placeholder="Promo Video URL (optional)"
          value={form.promoVideoUrl}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              promoVideoUrl: event.target.value,
            }))
          }
        />
        <input
          className="rounded-lg border border-brand-beige px-3 py-2 md:col-span-2"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(event) =>
            setForm((current) => ({ ...current, tags: event.target.value }))
          }
        />
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-brand-primary px-4 py-2 text-white disabled:opacity-70"
          >
            {submitting ? "Saving..." : editingId ? "Update Product" : "Create Product"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-brand-beige px-4 py-2"
            >
              Cancel
            </button>
          ) : null}
        </div>
        {error ? (
          <p className="md:col-span-2 text-sm text-red-600">{error}</p>
        ) : null}
      </form>

      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-beige bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-sand text-left text-brand-charcoal">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t border-brand-beige">
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3">{product.category?.name}</td>
                  <td className="px-4 py-3">{formatCurrency(product.price, { language, currency })}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="rounded-md p-2 text-brand-primary hover:bg-brand-sand"
                        type="button"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
