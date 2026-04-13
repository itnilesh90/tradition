import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";

const NewArrivalsSection = ({ products = [] }) => {
  return (
    <section className="space-y-5">
      <SectionHeading
        title="New Arrivals"
        subtitle="Fresh handcrafted drops curated for this season"
      />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.slice(0, 8).map((product) => (
          <div key={product._id} className="min-w-[250px] max-w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
