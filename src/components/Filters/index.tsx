import { useRef } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { TCategory } from '@/@types/categories';
import SortOption from '@/@types/sort-options';

type Props = {
  searchParams: URLSearchParams;
  categories: TCategory[];
  sortOptions: SortOption[];
  handleChangeFilter(filters: string[]): void;
  handleChangeFilterValues(): string[];
  handleChangeSort(value: string): void;
};

const Filters = ({
  searchParams,
  categories,
  sortOptions,
  handleChangeFilter,
  handleChangeFilterValues,
  handleChangeSort,
}: Props) => {
  const filtersDisclosure = useDisclosure();
  const filtersRef = useRef<HTMLButtonElement>(null);
  const sortDisclosure = useDisclosure();
  const sortRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      display={{ base: 'grid', sm: 'none' }}
      gridTemplateColumns="repeat(2, 1fr)"
      gap="1rem"
      padding="0 1.5rem"
    >
      <Button
        onClick={filtersDisclosure.onOpen}
        ref={filtersRef}
        rightIcon={<ChevronDownIcon size={16} />}
      >
        Filtros
      </Button>
      <Drawer
        isOpen={filtersDisclosure.isOpen}
        onClose={filtersDisclosure.onClose}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros</DrawerHeader>
          <Divider />
          <DrawerBody>
            <CheckboxGroup
              onChange={(value) => {
                handleChangeFilter(value as string[]);
              }}
              value={handleChangeFilterValues()}
            >
              <Stack direction="column">
                {categories.map((category) => (
                  <Checkbox
                    key={category.uid}
                    value={category.value}
                  >
                    {category.label}
                  </Checkbox>
                ))}
                <Divider />
                <Button
                  onClick={() => handleChangeFilter([])}
                  variant="outline"
                  leftIcon={<XIcon size={16} />}
                >
                  Limpar filtros
                </Button>
              </Stack>
            </CheckboxGroup>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button
        onClick={sortDisclosure.onOpen}
        ref={sortRef}
        leftIcon={<ChevronDownIcon size={16} />}
      >
        Ordem
      </Button>
      <Drawer
        isOpen={sortDisclosure.isOpen}
        onClose={sortDisclosure.onClose}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ordem</DrawerHeader>
          <Divider />
          <DrawerBody p={0}>
            <Stack
              direction="column"
              spacing={0}
              divider={<Divider />}
            >
              {sortOptions.map((item) => (
                <Button
                  key={item.value}
                  onClick={() => handleChangeSort(item.value)}
                  variant="ghost"
                  leftIcon={
                    (searchParams.get('ordem') === item.value && (
                      <CheckIcon size={16} />
                    )) ||
                    undefined
                  }
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Filters;
