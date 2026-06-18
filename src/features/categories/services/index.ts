import { eq } from "drizzle-orm";

import type {
  Category,
  InsertCategory,
  UpdateCategory,
} from "@/features/categories/types";

import { database } from "@/config/database";
import { categories } from "@/features/categories/schemas";

export async function createCategory(
  categoryData: InsertCategory
): Promise<Category> {
  const [createdCategory] = await database
    .insert(categories)
    .values(categoryData)
    .returning();

  return createdCategory;
}

export async function getCategoryById({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> {
  const foundCategory = await database.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });

  if (!foundCategory) {
    throw new Error("Category not found");
  }

  return foundCategory;
}

export async function getCategories(): Promise<Category[]> {
  const foundCategories = await database.query.categories.findMany();

  return foundCategories;
}

export async function updateCategoryById({
  categoryId,
  categoryData,
}: {
  categoryId: string;
  categoryData: UpdateCategory;
}): Promise<Category> {
  const [updatedCategory] = await database
    .update(categories)
    .set(categoryData)
    .where(eq(categories.id, categoryId))
    .returning();

  return updatedCategory;
}

export async function deleteCategoryById({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> {
  const [deletedCategory] = await database
    .delete(categories)
    .where(eq(categories.id, categoryId))
    .returning();

  return deletedCategory;
}
