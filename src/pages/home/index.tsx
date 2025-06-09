import { Suspense } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Container, Flex } from '@chakra-ui/react';
import { paths } from '@/config/paths';
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

  const { t } = useTranslation();

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
          t('common:state.loading')
        ) : !latestProductsQuery.data || !bestSellingProductsQuery.data ? (
          t('common:state.error')
        ) : (
          <>
            <Suspense fallback={<ProductsSectionSkeleton />}>
              <ProductsSection
                products={latestProductsQuery.data}
                link={`${paths.user.products}?sort=latest`}
                title={t('footer.menu.items.latest')}
              />
            </Suspense>
            <Suspense fallback={<ProductsSectionSkeleton />}>
              <ProductsSection
                products={bestSellingProductsQuery.data}
                link={`${paths.user.products}?sort=best-selling`}
                title={t('footer.menu.items.best-selling')}
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
