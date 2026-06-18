import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";

import { CategoryDisplayTable } from "@/features/categories/components/category-display-table";
import { CreateCategoryDialog } from "@/features/categories/components/create-category-dialog";
import { categoriesQueryOptions } from "@/features/categories/queries";

export const Route = createFileRoute("/admin/(admin-layout)/categories/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(categoriesQueryOptions());
  },
});

function RouteComponent() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Flex direction="column" gap="6" padding="6">
      <Flex alignItems="start" justifyContent="space-between">
        <Flex direction="column">
          <Heading size="2xl">Categories</Heading>
          <Text color="fg.muted">9999 Categories found</Text>
        </Flex>
        <Button
          onClick={() => {
            setDialogOpen(!dialogOpen);
          }}
        >
          <Icon size="sm">
            <PlusIcon />
          </Icon>
          New Category
        </Button>
        <CreateCategoryDialog open={dialogOpen} setIsOpen={setDialogOpen} />
      </Flex>
      <Suspense fallback={<Text>Loading categories...</Text>}>
        <CategoryDisplayTable />
      </Suspense>
    </Flex>
  );
}
