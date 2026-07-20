import type { SortingState, VisibilityState } from "@tanstack/react-table";

import { Button, Icon, Table, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/features/products/types";

import { toaster } from "@/components/ui/toaster";

import { productsQueryOptions } from "../queries";
import { ProductTableActions } from "./product-table-actions";
import { ProductTableFilter } from "./product-table-filter";

const columnHelper = createColumnHelper<Product>();

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
    header: "Product",
  }),
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "Description",
  }),
  columnHelper.accessor("price", {
    cell: (info) =>
      Number(info.getValue()).toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
      }),
    header: "Price",
  }),
  columnHelper.display({
    cell: (props) => <ProductTableActions cellProps={props} />,
    header: "Actions",
    id: "actions",
  }),
];

export function ProductTable() {
  const { data } = useSuspenseQuery(productsQueryOptions({}));

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: data.products,
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
      <ProductTableFilter table={table} />
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
    </>
  );
}
