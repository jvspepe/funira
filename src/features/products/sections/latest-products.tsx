import { useSuspenseQuery } from "@tanstack/react-query";

import { SORT_PARAM } from "@/config/constants";
import { paths } from "@/config/paths";

import { ProductsSection } from "../components/products-section";
import { getProducts } from "../services";

export function LatestProducts() {
  const latestProductsQuery = useSuspenseQuery({
    queryFn: async () =>
      await getProducts({
        limitBy: 4,
        sortBy: ["createdAt", "desc"],
      }),
    queryKey: ["products", "best-selling"],
  });

  return (
    <ProductsSection
      title="Mais recentes"
      products={latestProductsQuery.data}
      link={`${paths.user.products}?${SORT_PARAM}=latest`}
    />
  );
}
