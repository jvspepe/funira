import { Timestamp } from "firebase/firestore";

type TProduct = {
  uid: string;
  images: string[];
  name: string;
  price: number;
  category: string;
  description?: string;
  dimensions: {
    depth?: string;
    height: string;
    width: string;
  };
  rating: number;
  sales: number;
  createdAt: Timestamp;
};

type TCartProduct = TProduct & { quantity: number };

export type { TProduct, TCartProduct };
