// oxlint-disable import/no-cycle
import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

import { productCategories } from "@/features/product-categories/schemas";

export const categories = pgTable("categories", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: varchar({ length: 150 }).notNull(),
  id: uuid()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: varchar({ length: 30 }).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(productCategories),
}));
