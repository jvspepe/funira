import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { serverEnv } from "@/config/server-env";
import * as categoriesSchema from "@/features/categories/schemas";
import * as productCategoriesSchema from "@/features/product-categories/schemas";
import * as productImageSchema from "@/features/product-images/schemas";
import * as productSchema from "@/features/products/schemas";

const client = postgres(serverEnv.DATABASE_URL, { prepare: false });

export const database = drizzle(client, {
  schema: {
    ...categoriesSchema,
    ...productCategoriesSchema,
    ...productImageSchema,
    ...productSchema,
  },
});
