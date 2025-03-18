import { useEffect, useState } from 'react';
import { limit, orderBy } from 'firebase/firestore';
import { getDocuments } from '@/lib/database';
import { TProduct } from '@/@types/product';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import ProductDisplay from '@/components/ProductDisplay';
import { Container } from '@chakra-ui/react';

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
      <Features />
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        }}
        padding={{ base: '0 1.5rem', md: '0' }}
      >
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
      </Container>

      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
