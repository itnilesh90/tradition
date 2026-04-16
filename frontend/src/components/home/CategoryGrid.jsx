import SectionHeading from "../common/SectionHeading";
import { Link } from "react-router-dom";
import useI18n from "../../hooks/useI18n";

const keyCategories = [
  {
    title: "Winter Shawls",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kurta Pajama Women",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Jewellery Artificial",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Fabric Tote Bag (Block Print)",
    image:
      "https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Masale (Spices)",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=80",
  },
];

const CategoryGrid = () => (
  <CategoryGridContent />
);

function CategoryGridContent() {
  const { t } = useI18n();

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl px-4 md:px-6">
      <SectionHeading
        title={t("home.shopByCategory")}
        subtitle={t("home.shopByCategorySubtitle")}
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keyCategories.map((category) => (
          <Link
            key={category.title}
            to={`/products?search=${encodeURIComponent(category.title)}`}
            className="group relative h-52 overflow-hidden rounded-2xl bg-slate-200"
          >
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <p className="absolute bottom-3 left-3 text-lg font-semibold text-white">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
