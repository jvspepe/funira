import type { InferInput } from "valibot";

import { array, nonEmpty, object, partial, pick, pipe, string } from "valibot";

export const ProductSchema = object({
  createdAt: pipe(string(), nonEmpty()),
  description: pipe(string(), nonEmpty()),
  id: pipe(string(), nonEmpty()),
  name: pipe(string(), nonEmpty()),
  updatedAt: pipe(string(), nonEmpty()),
});

export const InsertProductSchema = pick(ProductSchema, ["name", "description"]);
export const InsertProductWithCategoriesSchema = object({
  ...InsertProductSchema.entries,
  categories: array(string()),
});
export const UpdateProductSchema = partial(InsertProductSchema);

export type Product = InferInput<typeof ProductSchema>;
export type InsertProduct = InferInput<typeof InsertProductSchema>;
export type InsertProductWithCategories = InferInput<
  typeof InsertProductWithCategoriesSchema
>;
export type UpdateProduct = InferInput<typeof UpdateProductSchema>;
