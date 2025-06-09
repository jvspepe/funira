import { useTranslation } from 'react-i18next';
import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { ListFilterIcon } from 'lucide-react';

interface ProductsSortProps {
  handleChangeSort: (value: string) => void;
}

export function ProductsSort({ handleChangeSort }: ProductsSortProps) {
  const { t } = useTranslation();

  const productRoutes = t('footer.menu.items', {
    returnObjects: true,
  }) as Record<string, string>[];

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
          {t('products.actions.sort')}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {Object.keys(productRoutes).map((key) => (
              <Menu.Item
                key={key}
                value={key}
                onClick={() => handleChangeSort(key)}
              >
                {t(`footer.menu.items.${key}`)}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
