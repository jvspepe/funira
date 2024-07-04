import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "@/api/firebase/firebase-config";
import { getProduct } from "@/api/firebase/firestore/products";
import { TProduct } from "@/@types/product";
import CallToAction from "@/components/Contact";
import Features from "@/components/Features";
import ProductListing from "@/components/ProductListing";

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<TProduct | null>(null);

  const getSingleProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const databaseProduct = await getProduct(firestore, productId);
      setProduct(databaseProduct);
    } catch (error) {
      throw new Error(String(error));
    }
  }, [productId]);

  useEffect(() => {
    getSingleProduct().catch((error) => {
      throw new Error(String(error));
    });
  }, [getSingleProduct]);
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
