import { queryOptions } from "@tanstack/react-query";

import {
  getCategories,
  getCategoryById,
} from "@/features/categories/functions";

export const categoryQueryKeys = {
  details: (categoryId: string) => [...categoryQueryKeys.list, categoryId],
  list: ["categories"],
};

export function categoriesQueryOptions() {
  return queryOptions({
    queryFn: async () => await getCategories(),
    queryKey: categoryQueryKeys.list,
  });
}

export function categoryDetailsQueryOptions(categoryId: string) {
  return queryOptions({
    queryFn: async () => await getCategoryById({ data: { categoryId } }),
    queryKey: categoryQueryKeys.details(categoryId),
  });
}
