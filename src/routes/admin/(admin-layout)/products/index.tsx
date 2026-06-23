import type { SortingState, VisibilityState } from "@tanstack/react-table";

import {
  Button,
  Field,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  Menu,
  Table,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  createColumnHelper,
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
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  Columns2Icon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import type { Product } from "@/features/products/types";

import { categoriesQueryOptions } from "@/features/categories/queries";

const products: Product[] = [
  {
    createdAt: "",
    description: "Test description",
    id: "1",
    name: "Product 1",
    updatedAt: "",
  },
  {
    createdAt: "",
    description: "Test description",
    id: "2",
    name: "Product 2",
    updatedAt: "",
  },
  {
    createdAt: "",
    description: "Test description",
    id: "3",
    name: "Product 3",
    updatedAt: "",
  },
];

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Product",
  }),
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "Description",
  }),
];

export const Route = createFileRoute("/admin/(admin-layout)/products/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(categoriesQueryOptions());
  },
});

function RouteComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: products,
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
    <Flex direction="column" gap="6" padding="6">
      <Flex alignItems="start" justifyContent="space-between">
        <Flex direction="column">
          <Heading size="2xl">Products</Heading>
          <Text color="fg.muted">9999 products found</Text>
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
      <Flex gap="2">
        <Field.Root>
          <VisuallyHidden>
            <Field.Label htmlFor="product-search">Search products</Field.Label>
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
              id="product-search"
              name="product-search"
              type="search"
              placeholder="Search for a product..."
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
                <Menu.Item value="price-descending" disabled>
                  <BanknoteArrowDownIcon />
                  Price
                </Menu.Item>
                <Menu.Item value="price-ascending" disabled>
                  <BanknoteArrowUpIcon />
                  Price
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Arrow />
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
      <Table.Root variant="outline" native>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table.Root>
    </Flex>
  );
}
