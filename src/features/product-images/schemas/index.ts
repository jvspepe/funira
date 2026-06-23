// oxlint-disable import/no-cycle
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

import { products } from "@/features/products/schemas";

export const productImages = pgTable("product_images", {
  altText: text("alt_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  displayOrder: integer("display_order").notNull(),
  id: uuid()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  imageUrl: text("image_url").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productImageRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
