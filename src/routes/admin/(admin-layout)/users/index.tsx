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
  CopyIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import type { User } from "@/config/auth";

import { toaster } from "@/components/ui/toaster";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => {
      function handleCopyId() {
        toaster.promise(navigator.clipboard.writeText(info.getValue()), {
          loading: { title: "Copying ID..." },
          success: { title: `Copied ID for ${info.row.original.name}` },
        });
      }

      return (
        <Button onClick={handleCopyId} type="button" variant="ghost">
          <Icon size="sm">
            <CopyIcon />
          </Icon>
          Copy ID
        </Button>
      );
    },
    enableSorting: false,
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "E-mail",
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    header: "Role",
  }),
];

const mockUsers: User[] = [
  {
    banned: false,
    createdAt: new Date(),
    email: "john@doe.com",
    emailVerified: false,
    id: "1",
    name: "John Doe",
    role: "User",
    updatedAt: new Date(),
  },
];

export const Route = createFileRoute("/admin/(admin-layout)/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: mockUsers,
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
          <Heading size="2xl">Users</Heading>
          <Text color="fg.muted">
            {mockUsers.length} {mockUsers.length === 1 ? "user" : "users"} found
          </Text>
        </Flex>
        <Button asChild>
          <Link to="/admin/users">
            <Icon size="sm">
              <PlusIcon />
            </Icon>
            New user
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
                <Menu.Item
                  value="a-z"
                  onClick={() => {
                    setSorting([{ desc: false, id: "name" }]);
                  }}
                >
                  <ArrowDownAZIcon />
                  Name A–Z
                </Menu.Item>
                <Menu.Item
                  value="z-a"
                  onClick={() => {
                    setSorting([{ desc: true, id: "name" }]);
                  }}
                >
                  <ArrowDownZAIcon />
                  Name Z–A
                </Menu.Item>
                <Menu.Item
                  value="price-descending"
                  onClick={() => {
                    setSorting([{ desc: true, id: "price" }]);
                  }}
                >
                  <BanknoteArrowDownIcon />
                  Price high–low
                </Menu.Item>
                <Menu.Item
                  value="price-ascending"
                  onClick={() => {
                    setSorting([{ desc: false, id: "price" }]);
                  }}
                >
                  <BanknoteArrowUpIcon />
                  Price low–high
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                <Text textAlign="center" color="fg.muted" padding="6">
                  No products found
                </Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
