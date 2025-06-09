import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  EmptyState,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { FrownIcon } from 'lucide-react';
import { SORT_PARAM, TYPE_PARAM } from '@/config/constants';
import { getProducts } from '@/features/products/services';
import { getCategories } from '@/features/categories/services';
import { filterProducts, sortProducts } from '@/utils';
import { ProductCard } from '@/features/products/components/product-card';
import { ProductsHeader } from '@/features/products/components/products-header';
import { ProductsSort } from '@/features/products/components/products-sort';
import { ProductsFilter } from '@/features/products/components/products-filter';

const PAGE_SIZE = 8;

export function ProductsDisplay() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      await getProducts({ limitBy: PAGE_SIZE, sortBy: ['name', 'asc'] }),
  });

  const categoriesQuery = useQuery({
    enabled: productsQuery.isSuccess,
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get(SORT_PARAM);
  const typeParams = searchParams.getAll(TYPE_PARAM);

  function handleChangeSort(value: string) {
    if (sortParam === value) {
      searchParams.delete(SORT_PARAM);
      setSearchParams(searchParams);
    } else {
      searchParams.set(SORT_PARAM, value);
      setSearchParams(searchParams);
    }
  }

  return (
    <>
      <ProductsHeader />
      <Container
        display="flex"
        flexGrow="1"
      >
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap="{spacing.6}"
          position="relative"
          paddingY="{spacing.6}"
          width="full"
        >
          <GridItem
            colSpan={1}
            rowSpan={{ lg: 2 }}
          >
            <ProductsFilter categories={categoriesQuery.data ?? []} />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            justifySelf={{ lg: 'end' }}
          >
            <ProductsSort handleChangeSort={handleChangeSort} />
          </GridItem>
          {productsQuery.isLoading ? (
            'Carregando informações'
          ) : !productsQuery.data ||
            productsQuery.data.length === 0 ||
            filterProducts(
              typeParams,
              sortProducts(sortParam, productsQuery.data)
            ).length === 0 ? (
            <GridItem colSpan={3}>
              <EmptyState.Root
                size="lg"
                alignItems={'start'}
                justifyContent={'start'}
              >
                <EmptyState.Content gap="{spacing.2}">
                  <EmptyState.Indicator>
                    <FrownIcon />
                  </EmptyState.Indicator>
                  <VStack textAlign="center">
                    <EmptyState.Title>
                      Nenhum produto encontrado
                    </EmptyState.Title>
                    <EmptyState.Description>
                      Tente ajustar sua pesquisa ou remover alguns filtros
                    </EmptyState.Description>
                  </VStack>
                </EmptyState.Content>
              </EmptyState.Root>
            </GridItem>
          ) : (
            <GridItem colSpan={{ base: 2, lg: 4 }}>
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
                gridAutoRows="1fr"
                gap="{spacing.6}"
              >
                {filterProducts(
                  typeParams,
                  sortProducts(sortParam, productsQuery.data)
                ).map((product) => (
                  <GridItem
                    key={product.id}
                    display="flex"
                  >
                    <ProductCard product={product} />
                  </GridItem>
                ))}
              </Grid>
            </GridItem>
          )}
        </Grid>
      </Container>
    </>
  );
}
