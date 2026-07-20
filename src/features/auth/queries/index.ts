import { queryOptions } from "@tanstack/react-query";

import { getSession } from "@/features/auth/functions";

export const authQueryKeys = {
  all: ["user"],
};

export const authQueryOptions = () =>
  queryOptions({
    queryFn: async () => await getSession(),
    queryKey: authQueryKeys.all,
  });
