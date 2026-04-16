import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";
import useI18n from "../../hooks/useI18n";

const AccessoriesSection = ({ products = [] }) => {
  const { t } = useI18n();
  return (
    <section className="space-y-5">
      <SectionHeading
        title={t("home.accessories")}
        subtitle={t("home.accessoriesSub")}
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
