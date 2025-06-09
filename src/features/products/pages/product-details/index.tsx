import { Suspense } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Contact } from '@/components/sections/contact';
import { Features } from '@/components/sections/features';
import { ProductListing } from '@/features/products/components/product-listing';
import { ProductListingSkeleton } from '@/features/products/components/product-listing/product-listing-skeleton';

export function ProductDetails() {
  return (
    <Flex
      direction="column"
      gap="{spacing.12}"
    >
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing />
      </Suspense>
      <Container
        display="flex"
        flexDirection="column"
        gap="{spacing.12}"
        paddingBottom="{spacing.12}"
      >
        <Features />
        <Contact />
      </Container>
    </Flex>
  );
}
