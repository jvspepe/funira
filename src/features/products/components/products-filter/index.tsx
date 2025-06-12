import { useSearchParams } from 'react-router';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Drawer,
  Heading,
  Icon,
  Portal,
  Separator,
  Stack,
} from '@chakra-ui/react';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { type Category } from '@/@types/models';
import { TYPE_PARAM } from '@/config/constants';
import { useTranslation } from 'react-i18next';

interface ProductsFilterProps {
  categories: Category[];
}

export function ProductsFilter({ categories }: ProductsFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { t, i18n } = useTranslation();

  const resolvedLanguage = i18n.resolvedLanguage as 'en' | 'pt';

  const handleChangeFilter = (filters: string[]) => {
    setSearchParams({
      [TYPE_PARAM]: filters,
    });
  };

  function handleChangeFilterValues() {
    const values: string[] = [];
    const typeParams = searchParams.getAll(TYPE_PARAM);

    if (!typeParams) return [];

    categories.forEach((category) => {
      if (typeParams.includes(category.value)) {
        values.push(category.value);
      }
    });

    return values;
  }
  return (
    <>
      <Box
        display={{ base: 'none', lg: 'block' }}
        height="full"
        minWidth="10rem"
      >
        <Stack>
          <Heading>{t('products.actions.filter-by')}</Heading>
          <Stack>
            <Heading>{t('products.type')}</Heading>
            <CheckboxGroup
              onValueChange={(values) => handleChangeFilter(values)}
              value={handleChangeFilterValues()}
            >
              {categories.map((category) => (
                <Checkbox.Root
                  key={category.id}
                  value={category.value}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>
                    {category.label[resolvedLanguage]}
                  </Checkbox.Label>
                </Checkbox.Root>
              ))}
            </CheckboxGroup>
          </Stack>
        </Stack>
      </Box>
      <Drawer.Root placement="bottom">
        <Drawer.Trigger
          asChild
          display={{ lg: 'none' }}
          width="full"
        >
          <Button variant="surface">
            <Icon size="sm">
              <SlidersHorizontalIcon />
            </Icon>
            {t('products.actions.filter')}
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Header>{t('products.actions.filters')}</Drawer.Header>
              <Separator />
              <Drawer.Body>
                <CheckboxGroup
                  onValueChange={(values) => handleChangeFilter(values)}
                  value={handleChangeFilterValues()}
                >
                  {categories.map((category) => (
                    <Checkbox.Root
                      key={category.id}
                      value={category.value}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>
                        {category.label[resolvedLanguage]}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                  <Separator />
                  <Button
                    onClick={() => handleChangeFilter([])}
                    variant="outline"
                  >
                    <XIcon size={16} />
                    {t('products.actions.filters-clear')}
                  </Button>
                </CheckboxGroup>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
