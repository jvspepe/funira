import { Suspense } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Container, Flex } from '@chakra-ui/react';
import { getProducts } from '@/features/products/services';
import { Contact } from '@/components/section/contact';
import { Features } from '@/components/section/features';
import { Hero } from '@/components/section/hero';
import { Newsletter } from '@/components/section/newsletter';
import { ProductsSection } from '@/features/products/components/products-section';
import { ProductsSectionSkeleton } from '@/features/products/components/products-section/skeleton';

const QUERY_LIMIT = 4;

export function HomePage() {
  const [latestProductsQuery, bestSellingProductsQuery] = useQueries({
    queries: [
      {
        queryKey: ['products', 'latest'],
        queryFn: async () =>
          await getProducts({
            limitBy: QUERY_LIMIT,
            sortBy: ['createdAt', 'desc'],
          }),
      },
      {
        queryKey: ['products', 'best-selling'],
        queryFn: async () =>
          await getProducts({
            limitBy: QUERY_LIMIT,
            sortBy: ['sales', 'desc'],
          }),
      },
    ],
  });

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
        {latestProductsQuery.isLoading || bestSellingProductsQuery.isLoading ? (
          'Carregando informações'
        ) : !latestProductsQuery.data || !bestSellingProductsQuery.data ? (
          'Nenhum produto encontrado'
        ) : (
          <>
            <Suspense fallback={<ProductsSectionSkeleton />}>
              <ProductsSection
                products={latestProductsQuery.data}
                link="/produtos?ordem=novo"
                title="Novos Produtos"
              />
            </Suspense>
            <Suspense fallback={<ProductsSectionSkeleton />}>
              <ProductsSection
                products={bestSellingProductsQuery.data}
                link="/produtos?ordem=mais-vendido"
                title="Produtos Populares"
              />
            </Suspense>
          </>
        )}
        <Contact />
      </Container>
      <Newsletter />
    </Flex>
  );
}
