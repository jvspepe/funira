import type { CellContext } from "@tanstack/react-table";

import { Icon, IconButton, Menu } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/features/products/types";

import { DeleteProductDialog } from "@/features/products/components/delete-product-dialog";

interface ProductTableActionsProps {
  cellProps: CellContext<Product, unknown>;
}

export function ProductTableActions({ cellProps }: ProductTableActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Menu.Root positioning={{ placement: "left-start" }}>
        <Menu.Trigger asChild>
          <IconButton variant="ghost" aria-label="Product actions">
            <Icon size="sm">
              <MoreHorizontalIcon />
            </Icon>
          </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Actions</Menu.ItemGroupLabel>
              <Menu.Separator />
              <Menu.Item asChild value="view-details">
                <Link
                  to="/admin/products/$productId"
                  params={{ productId: cellProps.row.original.id }}
                >
                  <Icon size="sm">
                    <EyeIcon />
                  </Icon>
                  View details
                </Link>
              </Menu.Item>
              <Menu.Item
                value="delete-product"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Icon size="sm">
                  <Trash2Icon />
                </Icon>
                Delete product
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
      <DeleteProductDialog
        product={cellProps.row.original}
        open={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
