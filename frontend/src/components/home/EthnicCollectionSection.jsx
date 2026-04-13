import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";

const EthnicCollectionSection = ({ products }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeading
        title="Ethnic Collection"
        subtitle="Curated festive favorites in traditional silhouettes and artisan detailing."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default EthnicCollectionSection;
