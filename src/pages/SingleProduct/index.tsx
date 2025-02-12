import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '@/lib/database';
import { TProduct } from '@/@types/product';
import CallToAction from '@/components/Contact';
import Features from '@/components/Features';
import ProductListing from '@/components/ProductListing';

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<TProduct | null>(null);

  const handleGetProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const { data } = await getDocument<TProduct>('products', productId);

      if (data) setProduct(data);
    } catch (error) {
      throw new Error(String(error));
    }
  }, [productId]);

  useEffect(() => {
    handleGetProduct().catch((error) => {
      throw new Error(String(error));
    });
  }, [handleGetProduct]);
  return product ? (
    <>
      <ProductListing product={product} />
      <Features />
      <CallToAction />
    </>
  ) : (
    <p>Loading</p>
  );
};

export default SingleProduct;
