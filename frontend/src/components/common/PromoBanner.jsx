import { Link } from "react-router-dom";

const PromoBanner = ({
  image,
  imageUrl,
  title,
  description,
  ctaLabel,
  ctaText,
  ctaLink,
  onCtaClick,
}) => {
  const buttonLabel = ctaLabel || ctaText;
  const bannerImage = image || imageUrl;

  return (
    <section className="grid gap-6 overflow-hidden rounded-2xl border border-rose-100 bg-white md:grid-cols-2">
      <img
        src={bannerImage}
        alt={title}
        className="h-64 w-full object-cover transition duration-500 hover:scale-105 md:h-full"
        loading="lazy"
      />
      <div className="flex flex-col justify-center gap-4 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Craft Story</p>
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600">{description}</p>
        {buttonLabel && ctaLink ? (
          <Link
            to={ctaLink}
            className="w-fit rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            {buttonLabel}
          </Link>
        ) : null}
        {buttonLabel && !ctaLink ? (
          <button
            onClick={onCtaClick}
            className="w-fit rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            type="button"
          >
            {buttonLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default PromoBanner;
