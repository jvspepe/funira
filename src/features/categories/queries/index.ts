import { queryOptions } from "@tanstack/react-query";

import { getCategories } from "@/features/categories/functions";

export const categoryQueryKeys = {
  list: ["categories"],
};

export function categoriesQueryOptions() {
  return queryOptions({
    queryFn: async () => await getCategories(),
    queryKey: categoryQueryKeys.list,
  });
}
