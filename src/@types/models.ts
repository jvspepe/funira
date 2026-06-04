import { Timestamp } from "firebase/firestore";
import { z } from "zod";

interface LocalizedString {
  en: string;
  pt: string;
}

export interface ReturnData<T> {
  status: "success" | "fail" | "error";
  message?: string;
  data?: T;
}

export const UserSchema = z.object({
  createdAt: z.instanceof(Timestamp).default(Timestamp.now()),
  email: z.string().email().nonempty(),
  id: z.string().nonempty(),
  role: z.enum(["customer", "admin"]),
  username: z.string().nonempty(),
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
