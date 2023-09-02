import Product from "../@types/product";
import CallToAction from "../components/Contact";
import Features from "../components/Features";
import ProductListing from "../components/ProductListing";
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
const SingleProduct = () => {
  return (
    <>
      <ProductListing />
      <ProductSection
        sectionTitle="Você também pode gostar"
        products={newProducts}
        route="/produtos"
      />
      <Features />
      <CallToAction />
    </>
  );
};

export default SingleProduct;
