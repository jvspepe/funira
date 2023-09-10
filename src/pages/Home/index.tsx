import { useEffect, useState } from "react";
import { limit, orderBy } from "firebase/firestore";
import { firestore } from "../../api/firebase/firebase-config";
import { getProducts } from "../../api/firebase/firestore/products";
import { TProduct } from "../../@types/product";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Contact from "../../components/Contact";
import Newsletter from "../../components/Newsletter";
import ProductDisplay from "../../components/ProductDisplay";

const Home = () => {
  const [newProducts, setNewProducts] = useState<TProduct[]>([]);
  const [ratedProducts, setRatedProducts] = useState<TProduct[]>([]);

  async function getHomeProducts() {
    try {
      const [
        { databaseProducts: newProducts },
        { databaseProducts: highestRatedProducts },
      ] = await Promise.all([
        getProducts(firestore, [orderBy("createdAt", "desc"), limit(4)]),
        getProducts(firestore, [orderBy("sales", "desc"), limit(4)]),
      ]);
      setNewProducts(newProducts);
      setRatedProducts(highestRatedProducts);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    getHomeProducts().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <ProductDisplay
        title="Novos Produtos"
        products={newProducts}
        link="/produtos?ordem=novos"
      />
      <ProductDisplay
        title="Produtos Populares"
        products={ratedProducts}
        link="/produtos?ordem=mais-vendidos"
      />

      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
