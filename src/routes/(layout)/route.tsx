import { Flex } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/sections/header";

export const Route = createFileRoute("/(layout)")({
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
