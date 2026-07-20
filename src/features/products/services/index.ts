import { count, eq } from "drizzle-orm";

import type {
  InsertProductWithDetails,
  Product,
  UpdateProduct,
} from "@/features/products/types";

import { database } from "@/config/database";
import { productCategories } from "@/features/product-categories/schemas";
import { productImages } from "@/features/product-images/schemas";
import { products } from "@/features/products/schemas";

interface ImageInput {
  altText?: string;
  displayOrder: number;
  imageUrl: string;
}

type CreateProductData = Omit<InsertProductWithDetails, "images"> & {
  categories: string[];
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

export async function createProductImages(
  productId: string,
  imageInputs: ImageInput[]
): Promise<void> {
  if (imageInputs.length === 0) {
    return;
  }

  await database.insert(productImages).values(
    imageInputs.map((image) => ({
      altText: image.altText,
      displayOrder: image.displayOrder,
      imageUrl: image.imageUrl,
      productId,
    }))
  );
}

export async function getProductById({ productId }: { productId: string }) {
  const foundProduct = await database.query.products.findFirst({
    where: eq(products.id, productId),
    with: {
      categories: {
        with: {
          category: true,
        },
      },
      images: true,
    },
  });

  if (foundProduct === undefined) {
    throw new Error("Product not found");
  }

  return foundProduct;
}

interface GetProductsParams {
  page?: number;
  limit?: number;
}

export async function getProducts({ page = 1, limit = 12 }: GetProductsParams) {
  console.log(page);
  console.log(limit);

  let safeLimit = limit;

  if (safeLimit < 0) {
    safeLimit = 12;
  }

  if (safeLimit > 20) {
    safeLimit = 20;
  }

  const offset = (page - 1) * safeLimit;

  const [foundProducts, [foundProductCount]] = await Promise.all([
    database.query.products.findMany({
      limit: safeLimit,
      offset,
      orderBy: (table, { asc }) => [asc(table.createdAt)],
      with: {
        categories: {
          with: { category: true },
        },
        images: true,
      },
    }),
    database.select({ count: count() }).from(products),
  ]);

  const returnedProducts = foundProducts.map((foundProduct) => ({
    ...foundProduct,
    categories: foundProduct.categories.map((category) => category.category),
  }));

  return {
    meta: {
      itemsPerPage: safeLimit,
      page,
      total: foundProductCount.count,
      totalPages: Math.ceil(foundProductCount.count / limit),
    },
    products: returnedProducts,
  };
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
