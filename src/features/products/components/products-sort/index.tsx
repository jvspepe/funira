import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { ListFilterIcon } from 'lucide-react';
import SortOption from '@/@types/sort-options';

const sortOptions: SortOption[] = [
  { label: 'A-Z', value: 'a-z' },
  { label: 'Z-A', value: 'z-a' },
  { label: 'Maior Preço', value: 'maior-preço' },
  { label: 'Menor Preço', value: 'menor-preço' },
  { label: 'Novos', value: 'novo' },
  { label: 'Mais Vendidos', value: 'mais-vendidos' },
  { label: 'Melhor Avaliados', value: 'melhor-avaliados' },
];

interface ProductsSortProps {
  handleChangeSort: (value: string) => void;
}

export function ProductsSort({ handleChangeSort }: ProductsSortProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          type="button"
          variant="surface"
          width={{ base: 'full', lg: 'fit-content' }}
        >
          <Icon size="sm">
            <ListFilterIcon />
          </Icon>
          Ordenar
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortOptions.map((sortOption) => (
              <Menu.Item
                key={sortOption.value}
                value={sortOption.value}
                onClick={() => handleChangeSort(sortOption.value)}
              >
                {sortOption.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
