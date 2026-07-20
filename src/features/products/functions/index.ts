import { createServerFn } from "@tanstack/react-start";
import { v7 as uuidv7 } from "uuid";
import {
  integer,
  minValue,
  number,
  object,
  optional,
  parse,
  pipe,
} from "valibot";

import * as productServices from "@/features/products/services";
import {
  InsertProductWithDetailsSchema,
  ProductSchema,
} from "@/features/products/types";
import * as storageServices from "@/features/storage/services";

const ProductPaginationOptionsSchema = object({
  limit: optional(pipe(number(), integer(), minValue(1))),
  page: optional(pipe(number(), integer(), minValue(1))),
});

export const createProduct = createServerFn({ method: "POST" })
  .validator((rawData: unknown) => {
    if (!(rawData instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return parse(InsertProductWithDetailsSchema, {
      categories: rawData
        .getAll("categories")
        .filter((item): item is string => typeof item === "string"),
      description: rawData.get("description"),
      images: rawData
        .getAll("images")
        .filter((item): item is File => item instanceof File),
      name: rawData.get("name"),
      price: rawData.get("price"),
    });
  })
  .handler(async ({ data }) => {
    const { images, ...productData } = data;

    const createdProduct = await productServices.createProduct(productData);

    const uploadedImages = await Promise.all(
      images.map(async (image, index) => {
        const extension = image.name.split(".").pop() ?? "jpg";
        const storagePath = `${createdProduct.id}/${uuidv7()}.${extension}`;
        await storageServices.uploadProductImage(image, storagePath);
        const imageUrl = storageServices.getPublicUrl(storagePath);
        return {
          altText: image.name,
          displayOrder: index + 1,
          imageUrl,
        };
      })
    );

    await productServices.createProductImages(
      createdProduct.id,
      uploadedImages
    );

    return createdProduct;
  });

export const getProductById = createServerFn({ method: "GET" })
  .validator(object({ productId: ProductSchema.entries.id }))
  .handler(
    async ({ data }) =>
      await productServices.getProductById({ productId: data.productId })
  );

export const getProducts = createServerFn({ method: "GET" })
  .validator(ProductPaginationOptionsSchema)
  .handler(async ({ data }) => await productServices.getProducts(data));

export const deleteProduct = createServerFn({ method: "GET" })
  .validator(object({ productId: ProductSchema.entries.id }))
  .handler(
    async ({ data }) =>
      await productServices.deleteProductById({ productId: data.productId })
  );
