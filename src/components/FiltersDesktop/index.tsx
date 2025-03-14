/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { TCategory } from '@/@types/categories';
import SortOption from '@/@types/sort-options';

type Props = {
  searchParams: URLSearchParams;
  categories: TCategory[];
  sortOptions: SortOption[];
  handleChangeFilter: (filters: string[]) => void;
  handleChangeFilterValues: () => string[];
  handleChangeSort: (value: string) => void;
};

const FiltersDesktop = ({
  searchParams,
  categories,
  sortOptions,
  handleChangeFilter,
  handleChangeFilterValues,
  handleChangeSort,
}: Props) => {
  return (
    <Box
      display={{ base: 'none', sm: 'flex' }}
      justifyContent="space-between"
      padding="0.5rem 0"
    >
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>Filtros</MenuButton>
        <MenuList>
          <MenuOptionGroup
            onChange={(value) => {
              if (!Array.isArray(value)) return Array.from(value);
              return handleChangeFilter(value);
            }}
            value={handleChangeFilterValues()}
            type="checkbox"
            title="Opções"
          >
            {categories.map((category) => (
              <MenuItemOption
                key={category.uid}
                value={category.value}
                icon={<CheckIcon size={16} />}
              >
                {category.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuItem
            as={'button'}
            onClick={() => handleChangeFilter([])}
            type="button"
            icon={<XIcon size={16} />}
          >
            Limpar filtros
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>Ordem</MenuButton>
        <MenuList>
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleChangeSort(option.value)}
              icon={
                (searchParams.get('ordem') === option.value && (
                  <CheckIcon size={16} />
                )) ||
                undefined
              }
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default FiltersDesktop;
