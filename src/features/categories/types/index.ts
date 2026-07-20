import type { InferInput } from "valibot";

import {
  date,
  nonEmpty,
  nullable,
  object,
  omit,
  partial,
  pipe,
  string,
} from "valibot";

export const CategorySchema = object({
  createdAt: date(),
  description: nullable(string()),
  id: pipe(string(), nonEmpty("A category must have an ID")),
  name: pipe(string(), nonEmpty("A category must have a name")),
  updatedAt: date(),
});

export const InsertCategorySchema = omit(CategorySchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const UpdateCategorySchema = partial(InsertCategorySchema);

export type Category = InferInput<typeof CategorySchema>;
export type InsertCategory = InferInput<typeof InsertCategorySchema>;
export type UpdateCategory = InferInput<typeof UpdateCategorySchema>;
