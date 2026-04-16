function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">{title}</h2>
      {subtitle ? <p className="text-neutral-600">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeading;
