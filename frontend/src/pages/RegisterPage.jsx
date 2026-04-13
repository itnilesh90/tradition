import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [localError, setLocalError] = useState("");

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    try {
      await dispatch(registerUser(form)).unwrap();
      navigate("/");
    } catch {
      // handled in slice
    }
  };

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Create account</h1>
      <p className="mb-6 text-sm text-slate-600">
        Join to wishlist, checkout, and track orders.
      </p>
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Phone
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Optional"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>
        {(localError || error) && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {localError || error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-emerald-700">
          Sign in
        </Link>
      </p>
    </main>
  );
}

export default RegisterPage;
