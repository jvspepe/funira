import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Button,
  Field,
  Flex,
  Icon,
  Input,
  InputGroup,
  Menu,
  Table,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownAZIcon,
  ArrowDownZAIcon,
  ArrowUpDownIcon,
  Columns2Icon,
  CopyIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import type { Category } from "@/features/categories/types";

import { toaster } from "@/components/ui/toaster";
import { CategoryTableActions } from "@/features/categories/components/category-table-actions";
import { categoriesQueryOptions } from "@/features/categories/queries";

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    cell: (info) => {
      function handleCopyCategoryId() {
        toaster.promise(
          navigator.clipboard.writeText(String(info.getValue())),
          {
            loading: {
              title: "Copying ID...",
            },
            success: {
              title: `Copied ID for ${info.row.original.name}`,
            },
          }
        );
      }

      return (
        <Button
          onClick={() => {
            handleCopyCategoryId();
          }}
          type="button"
          variant="ghost"
        >
          <Icon size="sm">
            <CopyIcon />
          </Icon>
          Copiar ID
        </Button>
      );
    },
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "actions",
    cell: (props) => <CategoryTableActions cellProps={props} />,
    header: "Menu",
  },
];

export function CategoryDisplayTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data: categories } = useSuspenseQuery(categoriesQueryOptions());

  const table = useReactTable({
    columns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      globalFilter,
      sorting,
    },
  });

  return (
    <>
      <Flex gap="2">
        <Field.Root>
          <VisuallyHidden>
            <Field.Label htmlFor="category-search">
              Search categories
            </Field.Label>
          </VisuallyHidden>
          <InputGroup
            startElement={
              <Icon size="sm">
                <SearchIcon />
              </Icon>
            }
          >
            <Input
              value={globalFilter}
              onChange={(event) => {
                table.setGlobalFilter(event.target.value);
              }}
              id="category-search"
              name="category-search"
              type="search"
              placeholder="Search for a category"
              variant="subtle"
            />
          </InputGroup>
        </Field.Root>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="subtle">
              <Icon size="sm">
                <Columns2Icon />
              </Icon>
              Columns
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Columns</Menu.ItemGroupLabel>
                <Menu.Separator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <Menu.CheckboxItem
                      key={column.id}
                      value={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(value);
                      }}
                    >
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                      <Menu.ItemIndicator />
                    </Menu.CheckboxItem>
                  ))}
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="subtle">
              <Icon size="sm">
                <ArrowUpDownIcon />
              </Icon>
              Sort
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Sort Options</Menu.ItemGroupLabel>
                <Menu.Separator />
                <Menu.Item value="a-z">
                  <ArrowDownAZIcon />
                  Name
                </Menu.Item>
                <Menu.Item value="z-a">
                  <ArrowDownZAIcon />
                  Name
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Arrow />
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
      <Table.Root variant="outline" native>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
