import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { serverEnv } from "@/config/server-env";
import { categories } from "@/features/categories/schemas";
import { productCategories } from "@/features/product-categories/schemas";
import { productImages } from "@/features/product-images/schemas";
import { products } from "@/features/products/schemas";

const client = postgres(serverEnv.DATABASE_URL, { prepare: false });

export const database = drizzle(client, {
  schema: {
    categories,
    productCategories,
    productImages,
    products,
  },
});
