import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";

const AccessoriesSection = ({ products = [] }) => {
  return (
    <section className="space-y-5">
      <SectionHeading
        title="Accessories Edit"
        subtitle="Bags, scrunchies, scarves, and artisan bracelets"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AccessoriesSection;
