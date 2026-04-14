import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";
import { useI18n } from "../../hooks/useI18n";

const NewArrivalsSection = ({ products = [] }) => {
  const { t } = useI18n();

  return (
    <section className="space-y-5">
      <SectionHeading
        title={t("home.newArrivalsTitle")}
        subtitle={t("home.newArrivalsSubtitle")}
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
