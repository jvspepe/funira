import { Timestamp } from 'firebase/firestore';

type LocalizedString = {
  en: string;
  pt: string;
};

export type ReturnData<T> = {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
};

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}

export interface Category {
  id: string;
  value: string;
  label: LocalizedString;
}

export interface Product {
  id: string;
  name: LocalizedString;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  summary: LocalizedString;
  description?: LocalizedString;
  dimensions: {
    depth?: string;
    height: string;
    width: string;
  };
  ratingsAverage: number;
  sales: number;
  createdAt: Timestamp;
}

export type CartProduct = Product & { quantity: number };
