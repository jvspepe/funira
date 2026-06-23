import type { InferInput } from "valibot";

import {
  date,
  integer,
  minValue,
  nonEmpty,
  number,
  object,
  omit,
  optional,
  pipe,
  string,
} from "valibot";

export const ProductImageSchema = object({
  altText: optional(string()),
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
