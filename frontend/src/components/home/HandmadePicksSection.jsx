import SectionHeading from "../common/SectionHeading";

const HandmadePicksSection = ({ products = [] }) => {
  return (
    <section className="space-y-6">
      <SectionHeading title="Handmade Picks" subtitle="Crafted with love by artisans." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <article
            key={product._id}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={product.images?.[0] || "https://placehold.co/500x400?text=Handmade"}
              alt={product.title}
              className="h-52 w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-semibold text-stone-900">{product.title}</h3>
              <p className="line-clamp-2 text-sm text-stone-600">{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HandmadePicksSection;
