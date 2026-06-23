import { eq } from "drizzle-orm";

import type {
  InsertProductWithDetails,
  Product,
  UpdateProduct,
} from "@/features/products/types";

import { database } from "@/config/database";
import { productCategories } from "@/features/product-categories/schemas";
import { products } from "@/features/products/schemas";

interface ImageInput {
  altText?: string;
  displayOrder: number;
  imageUrl: string;
}

type CreateProductData = InsertProductWithDetails & {
  images: ImageInput[];
};

export async function createProduct(data: CreateProductData): Promise<Product> {
  const { categories: categoryIds, ...productFields } = data;

  const [createdProduct] = await database
    .insert(products)
    .values(productFields)
    .returning();

  if (categoryIds.length > 0) {
    await database.insert(productCategories).values(
      categoryIds.map((categoryId) => ({
        categoryId,
        productId: createdProduct.id,
      }))
    );
  }

  return createdProduct;
}

export async function getProductById({
  productId,
}: {
  productId: string;
}): Promise<Product> {
  const foundProduct = await database.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!foundProduct) {
    throw new Error("Product not found");
  }

  return foundProduct;
}

export async function getProducts(): Promise<Product[]> {
  return await database.query.products.findMany();
}

export async function updateProductById({
  productId,
  productData,
}: {
  productId: string;
  productData: UpdateProduct;
}): Promise<Product> {
  const [updatedProduct] = await database
    .update(products)
    .set(productData)
    .where(eq(products.id, productId))
    .returning();

  return updatedProduct;
}

export async function deleteProductById({
  productId,
}: {
  productId: string;
}): Promise<Product> {
  const [deletedProduct] = await database
    .delete(products)
    .where(eq(products.id, productId))
    .returning();

  return deletedProduct;
}
