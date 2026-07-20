import type { InferInput } from "valibot";

import {
  date,
  integer,
  minValue,
  nonEmpty,
  nullable,
  number,
  object,
  omit,
  pipe,
  string,
} from "valibot";

export const ProductImageSchema = object({
  altText: nullable(string()),
  createdAt: date(),
  displayOrder: pipe(number(), integer(), minValue(1)),
  id: pipe(string(), nonEmpty()),
  imageUrl: pipe(string(), nonEmpty()),
  productId: pipe(string(), nonEmpty()),
  updatedAt: date(),
});

export const InsertProductImage = omit(ProductImageSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type ProductImage = InferInput<typeof ProductImageSchema>;
export type InsertProductImage = InferInput<typeof InsertProductImage>;
