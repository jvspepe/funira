import { useEffect, useState } from 'react';
import { limit, orderBy } from 'firebase/firestore';
import { Container } from '@chakra-ui/react';
import type { Product } from '@/@types/models';
import { getDocuments } from '@/lib/database';
import Hero from '@/components/section/hero';
import Features from '@/components/section/features';
import Contact from '@/components/contact';
import Newsletter from '@/components/section/newsletter';
import ProductDisplay from '@/components/product-display';

const QUERY_LIMIT = 4;

const Home = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [ratedProducts, setRatedProducts] = useState<Product[]>([]);

  async function handleProducts() {
    try {
      const [newProducts, highestRatedProducts] = await Promise.all([
        getDocuments<Product>(
          'products',
          orderBy('createdAt', 'desc'),
          limit(QUERY_LIMIT)
        ),
        getDocuments<Product>(
          'products',
          orderBy('sales', 'desc'),
          limit(QUERY_LIMIT)
        ),
      ]);

      if (newProducts.data) setNewProducts(newProducts.data.documents);

      if (highestRatedProducts.data)
        setRatedProducts(highestRatedProducts.data.documents);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    handleProducts().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Hero />
      <Container>
        <Features />
        <ProductDisplay
          products={newProducts}
          link="/produtos?ordem=novo"
          title="Novos Produtos"
        />
        <ProductDisplay
          products={ratedProducts}
          link="/produtos?ordem=mais-vendido"
          title="Produtos Populares"
        />
        <Contact />
      </Container>
      <Newsletter />
    </>
  );
};

export default Home;
