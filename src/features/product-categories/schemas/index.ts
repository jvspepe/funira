// oxlint-disable import/no-cycle
import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

import { categories } from "@/features/categories/schemas";
import { products } from "@/features/products/schemas";

export const productCategories = pgTable("product_categories", {
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
  })
);
