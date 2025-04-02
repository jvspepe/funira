import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { Button, Container, Grid, GridItem } from '@chakra-ui/react';
import { TProduct } from '@/@types/product';
import { getDocuments } from '@/lib/database';
import useGetCategories from '@/hooks/useGetCategories';
import ProductsHeader from '@/components/HeaderPage';
import ProductDisplay from '@/components/product-display';
import ProductFilters from '@/components/product-filters';
import ProductSortOptions from '@/components/product-sort-options';

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
  const [products, setProducts] = useState<TProduct[]>([]);
  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<TProduct>>();
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
        return products.sort((a, b) => b.rating - a.rating);
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
      const { data } = await getDocuments<TProduct>(
        'products',
        orderBy('name', 'asc'),
        limit(PAGE_SIZE)
      );

      if (data) {
        setProducts(data.documents);
        setStartAfterDoc(data.lastDocument);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function handleLoadProducts() {
    setLoading(true);
    try {
      const { data } = await getDocuments<TProduct>(
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
      <Container display="flex">
        <Grid
          templateAreas={{
            base: `'filters sort' 'products products'`,
            md: `'filters sort' 'filters products'`,
          }}
          gridAutoColumns={{ base: '1fr', md: 'initial' }}
          gap="1.25rem"
          position="relative"
          paddingY="1.25rem"
        >
          <GridItem area={'filters'}>
            <ProductFilters categories={categories} />
          </GridItem>
          <GridItem
            area={'sort'}
            justifySelf={{ md: 'end' }}
          >
            <ProductSortOptions handleChangeSort={handleChangeSort} />
          </GridItem>
          <GridItem
            area={'products'}
            display="grid"
            gap="1.25rem"
          >
            <ProductDisplay products={filteredProducts} />
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
        </Grid>
      </Container>
    </>
  );
};

export default Products;
