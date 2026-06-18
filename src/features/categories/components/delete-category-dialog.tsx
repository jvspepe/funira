import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import type { Category } from "@/features/categories/types";

import { toaster } from "@/components/ui/toaster";
import { deleteCategoryById } from "@/features/categories/functions";
import { categoryQueryKeys } from "@/features/categories/queries";

interface DeleteCategoryDialogProps {
  category: Category;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export function DeleteCategoryDialog({
  category,
  open,
  setIsOpen,
}: DeleteCategoryDialogProps) {
  const routeApi = getRouteApi("/admin/(admin-layout)/categories/");

  const { queryClient } = routeApi.useRouteContext();

  const deleteCategoryFn = useServerFn(deleteCategoryById);

  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: string) =>
      await deleteCategoryFn({
        data: {
          id: categoryId,
        },
      }),
    onSuccess: (deletedCategory) => {
      queryClient.setQueryData(
        categoryQueryKeys.list,
        (previousCategories: Category[]) => {
          if (!previousCategories) {
            return [];
          }

          return previousCategories.filter(
            (category) => category.id !== deletedCategory.id
          );
        }
      );
    },
  });

  function handleDeleteCategory(categoryId: string) {
    toaster.promise(deleteCategoryMutation.mutateAsync(categoryId), {
      error: {
        title: "Failed to delete category",
      },
      loading: {
        description: "Please wait",
        title: "Deleting category...",
      },
      success: {
        title: "Category successfully deleted",
      },
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setIsOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Confirm category deletion</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to delete this category? All related items
                will have their category set to empty.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteCategory(category.id)}
                colorPalette="red"
                loading={deleteCategoryMutation.isPending}
                loadingText
              >
                Delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
