import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import {
  createPromoVideo,
  getAllPromoVideos,
  updatePromoVideo,
} from "../../services/adminService";
import { useI18n } from "../../hooks/useI18n";

const initialForm = {
  title: "",
  videoUrl: "",
  fallbackImage: "",
  section: "hero",
};

const AdminPromoVideosPage = () => {
  const { t } = useI18n();
  const [promoVideos, setPromoVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAll = async () => {
    setLoading(true);
    try {
      const videos = await getAllPromoVideos();
      setPromoVideos(videos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createPromoVideo(form);
      setForm(initialForm);
      loadAll();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to create video");
    } finally {
      setSaving(false);
    }
  };

  const onToggle = async (promoVideo) => {
    await updatePromoVideo(promoVideo._id, { isActive: !promoVideo.isActive });
    loadAll();
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("adminPromo.title")}</h1>
        <p className="text-sm text-slate-600">{t("adminPromo.subtitle")}</p>
      </div>

      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t("adminPromo.addTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-xl border border-slate-300 px-3 py-2"
            placeholder={t("common.title")}
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-slate-300 px-3 py-2"
            placeholder={t("adminPromo.videoUrl")}
            value={form.videoUrl}
            onChange={(event) => setForm((current) => ({ ...current, videoUrl: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-slate-300 px-3 py-2"
            placeholder={t("adminPromo.fallbackOptional")}
            value={form.fallbackImage}
            onChange={(event) => setForm((current) => ({ ...current, fallbackImage: event.target.value }))}
          />
          <select
            className="rounded-xl border border-slate-300 px-3 py-2"
            value={form.section}
            onChange={(event) => setForm((current) => ({ ...current, section: event.target.value }))}
          >
            <option value="hero">{t("adminPromo.heroSection")}</option>
            <option value="brand-story">{t("adminPromo.brandStorySection")}</option>
          </select>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? t("common.saving") : t("common.create")}
        </button>
      </form>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t("adminPromo.allVideos")}</h2>
        {loading ? (
          <Loader className="py-8" />
        ) : (
          <div className="mt-4 space-y-3">
            {promoVideos.map((video) => (
              <div key={video._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-900">{video.title}</p>
                  <p className="text-xs text-slate-500">
                    {video.section} • {video.isActive ? t("common.active") : t("common.inactive")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggle(video)}
                  className="rounded-xl border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700"
                >
                  {t("common.toggle")}
                </button>
              </div>
            ))}
            {!promoVideos.length && <p className="text-sm text-slate-500">{t("adminPromo.noVideos")}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPromoVideosPage;
