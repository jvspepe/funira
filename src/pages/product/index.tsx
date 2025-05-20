import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Product } from '@/@types/models';
import { getDocument } from '@/lib/database';
import CallToAction from '@/components/contact';
import Features from '@/components/section/features';
import ProductListing from '@/components/product-listing';
import { Container } from '@chakra-ui/react';

const Product = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getDocument<Product>('products', id)
      .then((response) => {
        if (!response.data) return setMessage(response.message ?? '');
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return !product ? (
    <p>{message ?? 'Algo deu errado!'}</p>
  ) : (
    <>
      <ProductListing product={product} />
      <Container>
        <Features />
        <CallToAction />
      </Container>
    </>
  );
};

export default Product;
