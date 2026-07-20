import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

import { ProductTable } from "@/features/products/components/product-table";
import { productsQueryOptions } from "@/features/products/queries";

export const Route = createFileRoute("/admin/(admin-layout)/products/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(productsQueryOptions({}));
  },
});

function RouteComponent() {
  return (
    <Flex direction="column" gap="6" padding="6">
      <Flex alignItems="start" justifyContent="space-between">
        <Flex direction="column">
          <Heading size="2xl">Products</Heading>
          <Text color="fg.muted">Products found in the database</Text>
        </Flex>
        <Button asChild>
          <Link to="/admin/products/create">
            <Icon size="sm">
              <PlusIcon />
            </Icon>
            New product
          </Link>
        </Button>
      </Flex>
      <Suspense fallback={<Text>Loading products...</Text>}>
        <ProductTable />
      </Suspense>
    </Flex>
  );
}
