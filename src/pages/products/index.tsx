import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import {
  Button,
  Container,
  EmptyState,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { FrownIcon } from 'lucide-react';
import type { Product } from '@/@types/models';
import { getDocuments } from '@/lib/database';
import useGetCategories from '@/hooks/useGetCategories';
import ProductsHeader from '@/components/HeaderPage';
import ProductFilters from '@/components/product-filters';
import ProductSortOptions from '@/components/product-sort-options';
import ProductCard from '@/components/product-card';

const PAGE_SIZE = 8;

const SORT_OPTIONS = {
  alphabeticalAscending: 'a-z',
  alphabeticalDescending: 'z-a',
  priceDescending: 'maior-preço',
  priceAscending: 'menor-preço',
  soldDescending: 'mais-vendido',
  ratingDescending: 'melhor-avaliado',
  newest: 'novo',
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<Product>>();
  const [isLastDoc, setIsLastDoc] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { categories } = useGetCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  function sortProducts() {
    const sortParam = searchParams.get('ordem');
    switch (sortParam) {
      case SORT_OPTIONS.newest:
        return products.sort(
          (a, b) =>
            b.createdAt.toDate().valueOf() - a.createdAt.toDate().valueOf()
        );
      case SORT_OPTIONS.priceDescending:
        return products.sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.ratingDescending:
        return products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
      case SORT_OPTIONS.soldDescending:
        return products.sort((a, b) => b.sales - a.sales);
      case SORT_OPTIONS.priceAscending:
        return products.sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.alphabeticalDescending:
        return products.sort((a, b) => a.name.localeCompare(b.name) * -1);
      case SORT_OPTIONS.alphabeticalAscending:
      default:
        return products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  const filteredProducts = sortProducts().filter((product) => {
    const typeParams = searchParams.getAll('tipo');
    if (!typeParams || typeParams.length === 0) return true;
    return typeParams.includes(product.category);
  });

  async function handleGetProducts() {
    try {
      const { data } = await getDocuments<Product>(
        'products',
        orderBy('name', 'asc'),
        limit(PAGE_SIZE)
      );

      if (data) {
        setProducts(data.documents);
        setStartAfterDoc(data.lastDocument);
        setIsLastDoc(data.isLastDocument);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function handleLoadProducts() {
    setLoading(true);
    try {
      const { data } = await getDocuments<Product>(
        'products',
        orderBy('name', 'asc'),
        limit(PAGE_SIZE),
        startAfter(startAfterDoc)
      );

      if (data) {
        setProducts((previous) => [...previous, ...data.documents]);
        setStartAfterDoc(data.lastDocument);
        setIsLastDoc(data.isLastDocument);
      }
    } catch (error) {
      throw new Error(String(error));
    }
    setLoading(false);
  }

  function handleChangeSort(value: string) {
    const sortParams = searchParams.get('ordem');

    if (sortParams === value) {
      searchParams.delete('ordem');
      setSearchParams(searchParams);
    } else {
      searchParams.set('ordem', value);
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    handleGetProducts().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

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
            <ProductFilters categories={categories} />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            justifySelf={{ lg: 'end' }}
          >
            <ProductSortOptions handleChangeSort={handleChangeSort} />
          </GridItem>
          {!filteredProducts || filteredProducts.length === 0 ? (
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
                {filteredProducts.map((product) => (
                  <GridItem
                    key={product.id}
                    display="flex"
                  >
                    <ProductCard product={product} />
                  </GridItem>
                ))}
              </Grid>
              {!isLastDoc && (
                <Button
                  onClick={handleLoadProducts}
                  width="fit-content"
                  justifySelf="center"
                >
                  {loading ? 'Loading' : 'Ver mais'}
                </Button>
              )}
            </GridItem>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
