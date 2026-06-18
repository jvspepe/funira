import { createServerFn } from "@tanstack/react-start";
import { object, pick } from "valibot";

import * as categoryServices from "@/features/categories/services";
import {
  CategorySchema,
  InsertCategorySchema,
  UpdateCategorySchema,
} from "@/features/categories/types";

export const createCategory = createServerFn({ method: "POST" })
  .inputValidator(InsertCategorySchema)
  .handler(async ({ data }) => {
    const createdCategory = await categoryServices.createCategory(data);

    return createdCategory;
  });

export const getCategoryById = createServerFn({ method: "GET" })
  .inputValidator(pick(CategorySchema, ["id"]))
  .handler(async ({ data }) => {
    const foundCategory = await categoryServices.getCategoryById({
      categoryId: data.id,
    });

    return foundCategory;
  });

export const getCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const foundCategories = await categoryServices.getCategories();

    return foundCategories;
  }
);

export const updateCategoryById = createServerFn({ method: "POST" })
  .inputValidator(
    object({
      categoryData: UpdateCategorySchema,
      categoryId: CategorySchema.entries.id,
    })
  )
  .handler(async ({ data }) => {
    const updatedCategory = await categoryServices.updateCategoryById({
      categoryData: data.categoryData,
      categoryId: data.categoryId,
    });

    return updatedCategory;
  });

export const deleteCategoryById = createServerFn({ method: "GET" })
  .inputValidator(pick(CategorySchema, ["id"]))
  .handler(async ({ data }) => {
    const deletedCategory = await categoryServices.deleteCategoryById({
      categoryId: data.id,
    });

    return deletedCategory;
  });
