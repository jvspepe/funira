import { queryOptions } from "@tanstack/react-query";

import { getProductById, getProducts } from "@/features/products/functions";

export const productQueryKeys = {
  detail: (productId: string) => [...productQueryKeys.list, productId],
  list: ["products"],
};

export function productsQueryOptions({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) {
  return queryOptions({
    queryFn: async ({ signal }) => {
      console.log(page);
      console.log(limit);

      return await getProducts({
        data: {
          limit,
          page,
        },
        signal,
      });
    },
    queryKey: [productQueryKeys.list, page],
  });
}

export function productDetailsQueryOptions({
  productId,
}: {
  productId: string;
}) {
  return queryOptions({
    queryFn: async ({ signal }) =>
      await getProductById({ data: { productId }, signal }),
    queryKey: productQueryKeys.detail(productId),
  });
}
