/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { Button, Container } from '@chakra-ui/react';
import { TProduct } from '@/@types/product';
import { getDocuments } from '@/lib/database';
import useGetCategories from '@/hooks/useGetCategories';
import ProductsFilter from '@/components/ProductsFilter';
import ProductsHeader from '@/components/HeaderPage';
import ProductDisplay from '@/components/ProductDisplay';

const PAGE_SIZE = 8;

const SORT_OPTIONS = {
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

  const [searchParams] = useSearchParams();

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
      default:
        return products.sort((a, b) => a.price - b.price);
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

  useEffect(() => {
    handleGetProducts().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <>
      <ProductsHeader />
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1440px',
        }}
        padding="1rem 0"
      >
        <ProductsFilter categories={categories} />
        <ProductDisplay products={filteredProducts} />
        {!isLastDoc && (
          <Button onClick={handleLoadProducts}>
            {loading ? 'Loading' : 'Ver mais'}
          </Button>
        )}
      </Container>
    </>
  );
};

export default Products;
