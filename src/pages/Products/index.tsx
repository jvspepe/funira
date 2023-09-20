/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { TProduct } from "../../@types/product";
import { firestore } from "../../api/firebase/firebase-config";
import { getProducts } from "../../api/firebase/firestore/products";
import Button from "../../components/Button";
import ProductsFilter from "../../components/ProductsFilter";
import ProductsHeader from "../../components/HeaderPage";
import ProductSection from "../../components/ProductDisplay";
import Container from "./styles";
import useGetCategories from "../../hooks/useGetCategories";

const sortOptions = {
  highestPrice: "maior-preço",
  lowestPrice: "menor-preço",
  newest: "novo",
  bestSellers: "mais-vendido",
  highestRating: "melhor-avaliado",
};

const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [searchParams] = useSearchParams();
  const categories = useGetCategories();

  function sortProducts() {
    const sortParam = searchParams.get("ordem");
    switch (sortParam) {
      case sortOptions.newest:
        return products.sort(
          (a, b) =>
            b.createdAt.toDate().valueOf() - a.createdAt.toDate().valueOf()
        );
      case sortOptions.lowestPrice:
        return products.sort((a, b) => a.price - b.price);
      case sortOptions.highestPrice:
        return products.sort((a, b) => b.price - a.price);
      case sortOptions.highestRating:
        return products.sort((a, b) => b.rating - a.rating);
      case sortOptions.bestSellers:
        return products.sort((a, b) => b.sales - a.sales);
      default:
        return products.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  const filteredProducts = sortProducts().filter((product) => {
    const typeParams = searchParams.getAll("tipo");
    if (!typeParams || typeParams.length === 0) return true;
    return typeParams.includes(product.category);
  });

  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<TProduct>>();
  const [isLastDoc, setIsLastDoc] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] =
    useState<boolean>(false);
  const pageSize = 8;

  async function getAllProducts() {
    try {
      const { databaseProducts, lastDocument } = await getProducts(firestore, [
        orderBy("title", "asc"),
        limit(pageSize),
      ]);

      setProducts(databaseProducts);
      setStartAfterDoc(lastDocument);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function loadMoreProducts() {
    setLoadingMoreProducts(true);
    try {
      const { databaseProducts, lastDocument, isLastDocument } =
        await getProducts(firestore, [
          orderBy("title", "asc"),
          limit(pageSize),
          startAfter(startAfterDoc),
        ]);

      setProducts((previous) => [...previous, ...databaseProducts]);
      setStartAfterDoc(lastDocument);
      setIsLastDoc(isLastDocument);
    } catch (error) {
      throw new Error(String(error));
    }
    setLoadingMoreProducts(false);
  }

  useEffect(() => {
    getAllProducts().catch((error) => {
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
            onClick={loadMoreProducts}
            variant="secondary"
            style={{ marginInline: "auto" }}
          >
            {loadingMoreProducts ? "Loading" : "Ver mais"}
          </Button>
        )}
      </Container>
    </>
  );
};

export default Products;
