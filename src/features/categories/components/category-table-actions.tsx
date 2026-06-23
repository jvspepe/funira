import type { CellContext } from "@tanstack/react-table";

import { Icon, IconButton, Menu } from "@chakra-ui/react";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type { Category } from "@/features/categories/types";

import { DeleteCategoryDialog } from "@/features/categories/components/delete-category-dialog";
import { UpdateCategoryDialog } from "@/features/categories/components/update-category-dialog";

interface CategoryTableActionsProps {
  cellProps: CellContext<Category, unknown>;
}

export function CategoryTableActions({ cellProps }: CategoryTableActionsProps) {
  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] =
    useState<boolean>(false);
  const [isUpdateCategoryDialogOpen, setIsUpdateCategoryDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <Menu.Root positioning={{ placement: "left-start" }}>
        <Menu.Trigger asChild>
          <IconButton variant="ghost">
            <Icon>
              <MoreHorizontalIcon />
            </Icon>
          </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Actions</Menu.ItemGroupLabel>
              <Menu.Separator />
              <Menu.Item
                onClick={() => {
                  setIsUpdateCategoryDialogOpen(true);
                }}
                value="update-category"
              >
                <Icon size="sm">
                  <EditIcon />
                </Icon>
                Update category
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setIsDeleteCategoryDialogOpen(true);
                }}
                value="delete-category"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
              >
                <Icon size="sm">
                  <Trash2Icon />
                </Icon>
                Delete category
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
      <DeleteCategoryDialog
        category={cellProps.row.original}
        open={isDeleteCategoryDialogOpen}
        setIsOpen={setIsDeleteCategoryDialogOpen}
      />
      <UpdateCategoryDialog
        category={cellProps.row.original}
        open={isUpdateCategoryDialogOpen}
        setIsOpen={setIsUpdateCategoryDialogOpen}
      />
    </>
  );
}
