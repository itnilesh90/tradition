import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";
import useI18n from "../../hooks/useI18n";

const EthnicCollectionSection = ({ products }) => {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeading
        title={t("home.ethnicTitle")}
        subtitle={t("home.ethnicSubtitle")}
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
