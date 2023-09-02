import Product from "../@types/product";
import ProductSection from "../components/ProductSection";
import ProductsFilter from "../components/ProductsFilter";

import ProductsHeader from "../components/ProductsHeader";
import product1 from "/images/product-1.jpg";
import product2 from "/images/product-2.jpg";
import product3 from "/images/product-3.jpg";
import product4 from "/images/product-4.jpg";
import product5 from "/images/product-5.jpg";
import product6 from "/images/product-6-2.jpg";
import product7 from "/images/product-7-2.jpg";

const newProducts: Product[] = [
  {
    uid: Date.now().toString(),
    thumbnail: product2,
    title: "Cadeira Preta",
    price: 150,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product4,
    title: "Vasos Rústico",
    price: 300,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product3,
    title: "Vaso Cinza",
    price: 125,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product1,
    title: "Pendente Preta",
    price: 200,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product5,
    title: "Pendente Preta",
    price: 200,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product6,
    title: "Pendente Preta",
    price: 200,
  },
  {
    uid: Date.now().toString(),
    thumbnail: product7,
    title: "Pendente Preta",
    price: 200,
  },
];

const Products = () => {
  return (
    <>
      <ProductsHeader />
      <ProductsFilter />
      <ProductSection products={newProducts} />
    </>
  );
};

export default Products;
