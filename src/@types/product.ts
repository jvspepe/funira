import { Timestamp } from "firebase/firestore";

type TProduct = {
  uid: string;
  images: string[];
  title: string;
  price: number;
  category: string;
  description?: string;
  dimensions: {
    depth?: string;
    height: string;
    width: string;
  };
  stock: number;
  rating: number;
  sales: number;
  createdAt: Timestamp;
};

type TCartProduct = TProduct & { quantity: number };

export type { TProduct, TCartProduct };
