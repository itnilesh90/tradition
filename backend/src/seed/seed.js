import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import preseededCategories from "./categories.js";
import slugify from "../utils/slugify.js";

dotenv.config();

const categoryImage = (name) =>
  `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80&${encodeURIComponent(
    name
  )}`;

const sampleProductData = [
  {
    title: "Pashmina Winter Shawl",
    description: "Warm and soft artisan winter shawl with handcrafted borders.",
    category: "Winter Shawls",
    price: 1799,
    stock: 25,
    tags: ["ethnic", "shawl", "handmade", "winter"],
  },
  {
    title: "Block Print Cotton Bedsheet",
    description: "Breathable bedsheet with traditional block print motifs.",
    category: "Bedsheets",
    price: 1399,
    stock: 30,
    tags: ["home-decor", "handmade", "block-print"],
  },
  {
    title: "Women's Festive Kurta Pajama Set",
    description: "Elegant women's kurta pajama crafted for festive occasions.",
    category: "Kurta Pajama Women",
    price: 2499,
    stock: 20,
    tags: ["ethnic", "kurta", "women"],
  },
  {
    title: "Men's Cotton Kurta Pajama Set",
    description: "Classic men's kurta pajama in breathable cotton fabric.",
    category: "Kurta Pajama Men",
    price: 2199,
    stock: 22,
    tags: ["ethnic", "kurta", "men"],
  },
  {
    title: "Artificial Kundan Jewellery Set",
    description: "Royal-style kundan jewellery for wedding and festive looks.",
    category: "Jewellery Artificial",
    price: 1499,
    stock: 35,
    tags: ["jewellery", "ethnic", "accessories"],
  },
  {
    title: "Oxidized Silver Jhumka Earrings",
    description: "Handcrafted oxidized jhumka earrings with mirror work.",
    category: "Jhumka Earrings (Oxidized Silver)",
    price: 699,
    stock: 50,
    tags: ["jewellery", "jhumka", "accessories"],
  },
  {
    title: "Ethnic Necklace Set",
    description: "Detailed statement necklace set with matching earrings.",
    category: "Ethnic Necklace Set",
    price: 1199,
    stock: 40,
    tags: ["ethnic", "jewellery", "accessories"],
  },
  {
    title: "Handmade Beaded Bracelet",
    description: "Colorful handmade bracelet inspired by traditional crafts.",
    category: "Handmade Bracelet",
    price: 499,
    stock: 60,
    tags: ["handmade", "bracelet", "accessories"],
  },
  {
    title: "Pure Silk Scarf",
    description: "Luxury silk scarf with lightweight drape and hand-printed patterns.",
    category: "Scarf / Silk Scarf",
    price: 999,
    stock: 45,
    tags: ["scarf", "silk", "accessories"],
  },
  {
    title: "Fabric Hair Scrunchie Pack",
    description: "Set of soft handmade scrunchies with floral ethnic prints.",
    category: "Fabric Hair Scrunchies",
    price: 349,
    stock: 100,
    tags: ["scrunchies", "accessories", "handmade"],
  },
  {
    title: "Ethnic Accessory Combo",
    description: "Curated accessories combo with bracelet, ring, and earring.",
    category: "Accessories",
    price: 899,
    stock: 38,
    tags: ["accessories", "ethnic", "gift"],
  },
  {
    title: "Handpainted Home Decor Plate",
    description: "Decorative handcrafted wall plate for living spaces.",
    category: "Home Decor",
    price: 1299,
    stock: 18,
    tags: ["home-decor", "handmade", "gift"],
  },
  {
    title: "Garam Masala Blend",
    description: "Freshly ground small-batch garam masala spice mix.",
    category: "Masale (Spices)",
    price: 299,
    stock: 120,
    tags: ["masale", "spices", "kitchen"],
  },
  {
    title: "Handmade Fabric Cover Diary",
    description: "A5 diary with block-print fabric cover and quality pages.",
    category: "Diary",
    price: 549,
    stock: 42,
    tags: ["diary", "handmade", "gift"],
  },
  {
    title: "Gift Pouch Bag Set",
    description: "Reusable ethnic gift pouch bags in assorted colors.",
    category: "Gift Pouch Bag",
    price: 399,
    stock: 70,
    tags: ["gift", "bag", "handmade"],
  },
  {
    title: "Block Print Fabric Tote Bag",
    description: "Eco-friendly tote bag with hand block print design.",
    category: "Fabric Tote Bag (Block Print)",
    price: 799,
    stock: 55,
    tags: ["tote-bag", "handmade", "bag", "accessories"],
  },
  {
    title: "Ethnic Sling Bag",
    description: "Compact ethnic sling bag with embroidered detailing.",
    category: "Ethnic Sling Bag",
    price: 999,
    stock: 47,
    tags: ["bag", "ethnic", "accessories"],
  },
];

const seed = async () => {
  await connectDB();

  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);

  const categoryDocs = await Category.insertMany(
    preseededCategories.map((name) => ({
      name,
      slug: slugify(name),
      description: `${name} collection`,
      image: categoryImage(name),
      isActive: true,
    }))
  );

  const categoryMap = new Map(categoryDocs.map((cat) => [cat.name, cat._id]));
  const products = sampleProductData.map((item, index) => ({
    title: item.title,
    description: item.description,
    price: item.price,
    category: categoryMap.get(item.category),
    stock: item.stock,
    tags: item.tags,
    featured: index < 8,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    ],
    promoVideoUrl:
      index % 5 === 0
        ? "https://res.cloudinary.com/demo/video/upload/v1312461204/dog.mp4"
        : "",
  }));

  await Product.insertMany(products);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@tradition.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const customerEmail = process.env.SEED_USER_EMAIL || "customer@tradition.com";
  const customerPassword = process.env.SEED_USER_PASSWORD || "customer123";

  const [adminHash, customerHash] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(customerPassword, 10),
  ]);

  await User.findOneAndUpdate(
    { email: adminEmail },
    { name: "Admin", email: adminEmail, password: adminHash, role: "admin" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await User.findOneAndUpdate(
    { email: customerEmail },
    { name: "Customer", email: customerEmail, password: customerHash, role: "customer" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // eslint-disable-next-line no-console
  console.log("Seed completed");
  process.exit(0);
};

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
