import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { fallback, number, object, optional } from "valibot";

import { ProductDisplay } from "@/features/products/components/product-display";
import { ProductDisplayOptions } from "@/features/products/components/product-display-options";
import { productsQueryOptions } from "@/features/products/queries";

const ProductSearchSchema = object({
  page: optional(fallback(number(), 1), 1),
});

// oxlint-disable-next-line sort-keys
export const Route = createFileRoute("/(layout)/products/")({
  validateSearch: ProductSearchSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    await context.queryClient.prefetchQuery(
      productsQueryOptions({ limit: 4, page })
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex flexDirection="column" gap="4">
      <Flex
        flexDirection="column"
        backgroundColor="bg.subtle"
        paddingY="8"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size="2xl">Products</Heading>
        <Text color="fg.muted">in our store</Text>
      </Flex>
      <Container display="flex" flexDirection="column" gap="4">
        <ProductDisplayOptions />
        <Suspense fallback={<Text>Loading products...</Text>}>
          <ProductDisplay />
        </Suspense>
      </Container>
    </Flex>
  );
}
