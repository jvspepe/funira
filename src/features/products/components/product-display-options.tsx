import {
  Button,
  Field,
  Flex,
  Icon,
  Input,
  InputGroup,
  Menu,
  Portal,
  useCheckboxGroup,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FilterIcon, SearchIcon, SortDescIcon } from "lucide-react";
import { useState } from "react";

const filterItems = [
  { title: "Chairs", value: "chairs" },
  { title: "Beds", value: "beds" },
  { title: "Sofas", value: "sofas" },
  { title: "Tables", value: "tables" },
];

const sortItems = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export function ProductDisplayOptions() {
  const [value, setValue] = useState("asc");

  const group = useCheckboxGroup({ defaultValue: ["autosave"] });

  return (
    <Flex gap="2">
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            type="button"
            variant="outline"
            size={{ base: "sm", md: "md" }}
          >
            <Icon size="sm">
              <FilterIcon />
            </Icon>
            Filter
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Filter Options</Menu.ItemGroupLabel>
                <Menu.Separator />
                {filterItems.map(({ title, value }) => (
                  <Menu.CheckboxItem
                    key={value}
                    value={value}
                    checked={group.isChecked(value)}
                    onCheckedChange={() => group.toggleValue(value)}
                  >
                    {title}
                    <Menu.ItemIndicator />
                  </Menu.CheckboxItem>
                ))}
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            type="button"
            variant="outline"
            size={{ base: "sm", md: "md" }}
          >
            <Icon size="sm">
              <SortDescIcon />
            </Icon>
            Sort
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Sort Options</Menu.ItemGroupLabel>
                <Menu.Separator />
                <Menu.RadioItemGroup
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  {sortItems.map((item) => (
                    <Menu.RadioItem key={item.value} value={item.value}>
                      {item.label}
                      <Menu.ItemIndicator />
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioItemGroup>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Field.Root>
        <VisuallyHidden>
          <Field.Label>Pesquisar em produtos</Field.Label>
        </VisuallyHidden>
        <InputGroup
          startElement={
            <Icon size="sm">
              <SearchIcon />
            </Icon>
          }
        >
          <Input
            placeholder="Pesquisar em produtos"
            size={{ base: "sm", md: "md" }}
          />
        </InputGroup>
      </Field.Root>
    </Flex>
  );
}
