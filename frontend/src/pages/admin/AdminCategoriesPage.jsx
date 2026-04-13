import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory, updateCategory } from "../../services/adminService";
import { fetchCategories } from "../../store/slices/categorySlice";

const AdminCategoriesPage = () => {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    await createCategory({ name });
    setName("");
    dispatch(fetchCategories());
  };

  const handleSave = async (categoryId) => {
    if (!editName.trim()) return;
    await updateCategory(categoryId, { name: editName });
    setEditingId("");
    setEditName("");
    dispatch(fetchCategories());
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm("Delete this category?");
    if (!confirmed) return;
    await deleteCategory(categoryId);
    dispatch(fetchCategories());
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-stone-900">Category Manager</h1>
        <p className="mt-1 text-sm text-stone-500">Pre-seeded categories are editable.</p>
        <form className="mt-4 flex gap-2" onSubmit={handleCreate}>
          <input
            className="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none ring-orange-500 focus:ring"
            placeholder="Add category"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <button type="submit" className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white">
            Add
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center gap-2 rounded-xl border border-stone-100 p-3">
              {editingId === category._id ? (
                <>
                  <input
                    className="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none ring-orange-500 focus:ring"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                    onClick={() => handleSave(category._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1 text-sm text-stone-800">{category.name}</div>
                  <button
                    type="button"
                    className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium"
                    onClick={() => {
                      setEditingId(category._id);
                      setEditName(category.name);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                type="button"
                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
