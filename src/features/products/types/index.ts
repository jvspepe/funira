import type { InferInput } from "valibot";

import {
  array,
  date,
  decimal,
  file,
  maxSize,
  mimeType,
  nonEmpty,
  object,
  partial,
  pick,
  pipe,
  string,
} from "valibot";

export const ProductSchema = object({
  createdAt: date(),
  description: pipe(string(), nonEmpty()),
  id: pipe(string(), nonEmpty()),
  name: pipe(string(), nonEmpty()),
  price: pipe(string(), decimal()),
  updatedAt: date(),
});

export const InsertProductSchema = pick(ProductSchema, [
  "name",
  "description",
  "price",
]);

export const InsertProductWithDetailsSchema = object({
  ...InsertProductSchema.entries,
  categories: array(string()),
  images: array(
    pipe(
      file(),
      mimeType(["image/png", "image/jpeg"]),
      maxSize(1024 * 1024 * 5)
    )
  ),
});

export const UpdateProductSchema = partial(InsertProductSchema);

export type Product = InferInput<typeof ProductSchema>;

export type InsertProduct = InferInput<typeof InsertProductSchema>;

export type InsertProductWithDetails = InferInput<
  typeof InsertProductWithDetailsSchema
>;

export type UpdateProduct = InferInput<typeof UpdateProductSchema>;
