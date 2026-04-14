import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import useI18n from "../hooks/useI18n";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || "/");
    }
  }, [user, navigate, location.state]);

  const submitHandler = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(form));
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">{t("auth.loginTitle")}</h1>
      <p className="mt-1 text-sm text-gray-500">{t("auth.loginSubtitle")}</p>
      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}
      <form className="mt-6 space-y-4" onSubmit={submitHandler}>
        <input
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          type="email"
          required
          placeholder={t("auth.email")}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none ring-orange-200 focus:ring"
        />
        <input
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
          type="password"
          required
          placeholder={t("auth.password")}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none ring-orange-200 focus:ring"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t("auth.signingIn") : t("auth.loginButton")}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        {t("auth.newHere")}{" "}
        <Link className="font-medium text-orange-500" to="/register">
          {t("auth.createAccount")}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
