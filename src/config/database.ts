import { drizzle } from "drizzle-orm/postgres-js";

import { serverEnv } from "@/config/server-env";
import { categories } from "@/features/categories/schemas";
import { products } from "@/features/products/schemas";

export const database = drizzle(serverEnv.DATABASE_URL, {
  schema: {
    categories,
    products,
  },
});
