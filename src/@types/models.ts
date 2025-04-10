import { Timestamp } from 'firebase/firestore';

export type ReturnData<T> = {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
};

export type User = {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageCover: string;
  images: string[];
  category: string;
  summary: string;
  description?: string;
  dimensions: {
    depth?: string;
    height: string;
    width: string;
  };
  ratingsAverage: number;
  sales: number;
  createdAt: Timestamp;
};

export type CartProduct = Product & { quantity: number };
