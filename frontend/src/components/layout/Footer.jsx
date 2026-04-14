import { useI18n } from "../../hooks/useI18n";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Craft Stories", href: "#" },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 bg-stone-900 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-lg font-semibold">{t("brand")}</h3>
          <p className="mt-2 text-sm text-stone-300">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
            {t("footer.newsletter")}
          </h4>
          <p className="mt-2 text-sm text-stone-300">
            {t("footer.newsletterDescription")}
          </p>
          <div className="mt-4 flex gap-2">
            <input
              className="w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-sm text-white outline-none ring-orange-200 focus:ring-2"
              placeholder={t("footer.emailPlaceholder")}
              type="email"
            />
            <button className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
              {t("footer.join")}
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} {t("brand")} Crafts. {t("footer.rights")}
      </div>
    </footer>
  );
}
