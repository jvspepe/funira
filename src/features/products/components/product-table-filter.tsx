import type { Table } from "@tanstack/react-table";

import {
  Button,
  Field,
  Flex,
  Icon,
  Input,
  InputGroup,
  Menu,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  ArrowDownAZIcon,
  ArrowDownZAIcon,
  ArrowUpDownIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  Columns2Icon,
  SearchIcon,
} from "lucide-react";

import type { Product } from "../types";

interface ProductTableFilterProps {
  table: Table<Product>;
}

export function ProductTableFilter({ table }: ProductTableFilterProps) {
  return (
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
            value={table.getState().globalFilter}
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
                  table.setSorting([{ desc: false, id: "name" }]);
                }}
              >
                <Icon size="sm">
                  <ArrowDownAZIcon />
                </Icon>
                Name A–Z
              </Menu.Item>
              <Menu.Item
                value="z-a"
                onClick={() => {
                  table.setSorting([{ desc: true, id: "name" }]);
                }}
              >
                <Icon size="sm">
                  <ArrowDownZAIcon />
                </Icon>
                Name Z–A
              </Menu.Item>
              <Menu.Item
                value="price-descending"
                onClick={() => {
                  table.setSorting([{ desc: true, id: "price" }]);
                }}
              >
                <Icon size="sm">
                  <BanknoteArrowDownIcon />
                </Icon>
                Price high–low
              </Menu.Item>
              <Menu.Item
                value="price-ascending"
                onClick={() => {
                  table.setSorting([{ desc: false, id: "price" }]);
                }}
              >
                <Icon size="sm">
                  <BanknoteArrowUpIcon />
                </Icon>
                Price low–high
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Arrow />
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Flex>
  );
}
