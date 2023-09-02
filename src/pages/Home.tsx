import Product from "../@types/product";
import Contact from "../components/Contact";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProductSection from "../components/ProductSection";
import product1 from "/images/product-1.jpg";
import product2 from "/images/product-2.jpg";
import product3 from "/images/product-3.jpg";
import product4 from "/images/product-4.jpg";

const newProducts: Product[] = [
  {
    uid: Date.now().toString(),
    thumbnail: product2,
    title: "Cadeira Preta",
    price: 150,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product4,
    title: "Vasos Rústico",
    price: 300,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product3,
    title: "Vaso Cinza",
    price: 125,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product1,
    title: "Pendente Preta",
    price: 200,
  },
];

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <ProductSection
        sectionTitle="Novos Produtos"
        products={newProducts}
        route="/produtos?ordem=novo"
      />
      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
