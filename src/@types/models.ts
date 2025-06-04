import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

type LocalizedString = {
  en: string;
  pt: string;
};

export type ReturnData<T> = {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
};

export const UserSchema = z.object({
  id: z.string().nonempty(),
  email: z.string().email().nonempty(),
  username: z.string().nonempty(),
  role: z.enum(['customer', 'admin']),
  createdAt: z.instanceof(Timestamp).default(Timestamp.now()),
});

export type User = z.infer<typeof UserSchema>;

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
