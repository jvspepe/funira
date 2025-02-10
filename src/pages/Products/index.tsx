/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { TProduct } from '@/@types/product';
import { getDocuments } from '@/lib/database';
import useGetCategories from '@/hooks/useGetCategories';
import Button from '@/components/ui/Button';
import ProductsFilter from '@/components/ProductsFilter';
import ProductsHeader from '@/components/HeaderPage';
import ProductSection from '@/components/ProductDisplay';
import Container from './styles';

const PAGE_SIZE = 8;

const SORT_OPTIONS = {
  highestPrice: 'maior-preço',
  lowestPrice: 'menor-preço',
  newest: 'novo',
  bestSellers: 'mais-vendido',
  highestRating: 'melhor-avaliado',
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
      case SORT_OPTIONS.lowestPrice:
        return products.sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.highestPrice:
        return products.sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.highestRating:
        return products.sort((a, b) => b.rating - a.rating);
      case SORT_OPTIONS.bestSellers:
        return products.sort((a, b) => b.sales - a.sales);
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

  useEffect(() => {
    handleGetProducts().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <>
      <ProductsHeader />
      <Container>
        <ProductsFilter categories={categories} />
        <ProductSection products={filteredProducts} />
        {!isLastDoc && (
          <Button
            onClick={handleLoadProducts}
            variant="secondary"
            style={{ marginInline: 'auto' }}
          >
            {loading ? 'Loading' : 'Ver mais'}
          </Button>
        )}
      </Container>
    </>
  );
};

export default Products;
