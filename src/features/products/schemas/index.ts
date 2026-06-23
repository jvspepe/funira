// oxlint-disable import/no-cycle
import { relations } from "drizzle-orm";
import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

import { productCategories } from "@/features/product-categories/schemas";
import { productImages } from "@/features/product-images/schemas";

export const products = pgTable("products", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: varchar({ length: 150 }).notNull(),
  id: uuid()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: varchar({ length: 30 }).notNull(),
  price: numeric({ precision: 15, scale: 4 }).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  categories: many(productCategories),
  images: many(productImages),
}));
