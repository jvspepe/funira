import { useSuspenseQuery } from "@tanstack/react-query";

import { SORT_PARAM } from "@/config/constants";
import { paths } from "@/config/paths";

import { ProductsSection } from "../components/products-section";
import { getProducts } from "../services";

export function BestSellingProducts() {
  const bestSellingProductsQuery = useSuspenseQuery({
    queryFn: async () =>
      await getProducts({
        limitBy: 4,
        sortBy: ["sales", "desc"],
      }),
    queryKey: ["products", "best-selling"],
  });

  return (
    <ProductsSection
      title="Mais vendidos"
      products={bestSellingProductsQuery.data}
      link={`${paths.user.products}?${SORT_PARAM}=best-selling`}
    />
  );
}
