import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import type { Product } from "@/features/products/types";

import { toaster } from "@/components/ui/toaster";
import { deleteProduct } from "@/features/products/functions";
import { productQueryKeys } from "@/features/products/queries";

interface DeleteProductDialogProps {
  open: boolean;
  product: Product;
  setIsOpen: (value: boolean) => void;
}

export function DeleteProductDialog({
  open,
  product,
  setIsOpen,
}: DeleteProductDialogProps) {
  const routeApi = getRouteApi("/admin/(admin-layout)/products/");

  const { queryClient } = routeApi.useRouteContext();

  const deleteProductFn = useServerFn(deleteProduct);

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) =>
      await deleteProductFn({ data: { productId } }),
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(
        productQueryKeys.list,
        (previousProducts: Product[]) =>
          previousProducts.filter((p) => p.id !== deletedProduct.id)
      );
      setIsOpen(false);
    },
  });

  function handleDeleteProduct(productId: string) {
    toaster.promise(deleteProductMutation.mutateAsync(productId), {
      error: { title: "Failed to delete product" },
      loading: { description: "Please wait", title: "Deleting product..." },
      success: { title: "Product successfully deleted" },
    });
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        setIsOpen(e.open);
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Confirm product deletion</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to delete{" "}
                <Text as="span" fontWeight="semibold">
                  {product.name}
                </Text>
                ? This will permanently remove the product and all its images.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorPalette="red"
                loading={deleteProductMutation.isPending}
                loadingText="Deleting..."
                onClick={() => {
                  handleDeleteProduct(product.id);
                }}
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
