import { Suspense } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Contact } from '@/components/sections/contact';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { Newsletter } from '@/components/sections/newsletter';
import { ProductsSectionSkeleton } from '@/features/products/components/products-section/skeleton';
import { BestSellingProducts } from '@/features/products/sections/best-selling-products';
import { LatestProducts } from '@/features/products/sections/latest-products';

export function HomePage() {
  return (
    <Flex
      direction="column"
      gap="{spacing.12}"
    >
      <Hero />
      <Container
        display="flex"
        flexDirection="column"
        gap="{spacing.12}"
      >
        <Features />
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <LatestProducts />
        </Suspense>
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <BestSellingProducts />
        </Suspense>
        <Contact />
      </Container>
      <Newsletter />
    </Flex>
  );
}
