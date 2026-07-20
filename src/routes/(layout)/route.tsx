import { Flex } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/sections/header";
import { authQueryOptions } from "@/features/auth/queries";

export const Route = createFileRoute("/(layout)")({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery(authQueryOptions());

    return { session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex direction="column" minHeight="svh">
      <Header />
      <Outlet />
    </Flex>
  );
}
