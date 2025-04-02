import { useEffect, useState } from 'react';
import { limit, orderBy } from 'firebase/firestore';
import { Container } from '@chakra-ui/react';
import { getDocuments } from '@/lib/database';
import { TProduct } from '@/@types/product';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Contact from '@/components/contact';
import Newsletter from '@/components/newsletter';
import ProductDisplay from '@/components/product-display';

const QUERY_LIMIT = 4;

const Home = () => {
  const [newProducts, setNewProducts] = useState<TProduct[]>([]);
  const [ratedProducts, setRatedProducts] = useState<TProduct[]>([]);

  async function handleProducts() {
    try {
      const [newProducts, highestRatedProducts] = await Promise.all([
        getDocuments<TProduct>(
          'products',
          orderBy('createdAt', 'desc'),
          limit(QUERY_LIMIT)
        ),
        getDocuments<TProduct>(
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
          title="Novos Produtos"
          products={newProducts}
          link="/produtos?ordem=novo"
        />
        <ProductDisplay
          title="Produtos Populares"
          products={ratedProducts}
          link="/produtos?ordem=mais-vendido"
        />
        <Contact />
      </Container>
      <Newsletter />
    </>
  );
};

export default Home;
