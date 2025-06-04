import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  CloseButton,
  Collapsible,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Portal,
  Text,
  useCollapsible,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  LibraryBigIcon,
  MenuIcon,
  SofaIcon,
} from 'lucide-react';
import { type Category } from '@/@types/models';
import { paths } from '@/config/paths';

interface MobileDrawerProps {
  categories: Category[];
}

export function MobileDrawer({ categories }: MobileDrawerProps) {
  const collapsible = useCollapsible();
  const { t, i18n } = useTranslation();

  return (
    <Drawer.Root
      placement="start"
      size="xs"
    >
      <Drawer.Trigger asChild>
        <IconButton
          type="button"
          aria-label={t('mobileDrawer.openMenu', 'Abrir menu')}
          variant="ghost"
          size="lg"
          display={{ base: 'flex', md: 'none' }}
        >
          <Icon>
            <MenuIcon />
          </Icon>
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                {t('mobileDrawer.navigation', 'Navegação')}
              </Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="lg" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body paddingInline="{spacing.6}">
              <Flex
                as="ul"
                direction="column"
                justify="center"
                listStyleType="none"
              >
                <Box as="li">
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    width="full"
                    justifyContent="start"
                  >
                    <Link to={paths.user.home}>
                      <Icon>
                        <HomeIcon />
                      </Icon>
                      {t('navigation.home', 'Início')}
                    </Link>
                  </Button>
                </Box>
                <Box as="li">
                  <Collapsible.Root
                    open={collapsible.open}
                    onOpenChange={(event) => collapsible.setOpen(event.open)}
                  >
                    <Collapsible.Trigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        width="full"
                        justifyContent="space-between"
                        borderBottomRadius={collapsible.open ? 0 : undefined}
                      >
                        <Box
                          as="span"
                          display="flex"
                          alignItems="center"
                          gap="{spacing.3}"
                        >
                          <Icon>
                            <SofaIcon />
                          </Icon>
                          <Text>{t('navigation.products')}</Text>
                        </Box>
                        <Icon size="sm">
                          {collapsible.open ? (
                            <ChevronUpIcon />
                          ) : (
                            <ChevronDownIcon />
                          )}
                        </Icon>
                      </Button>
                    </Collapsible.Trigger>
                    <Collapsible.Content
                      backgroundColor="bg.subtle"
                      borderBottomRadius="{radii.l2}"
                    >
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          asChild
                          variant="ghost"
                          size="lg"
                          width="full"
                          justifyContent="start"
                          borderRadius="none"
                          _last={{ borderBottomRadius: '{radii.l2}' }}
                        >
                          <Link
                            to={`${paths.user.products}?tipo=${category.value}`}
                          >
                            {category.label[i18n.language as 'pt' | 'en'] ||
                              category.label.en}
                          </Link>
                        </Button>
                      ))}
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>
                <Box as="li">
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    width="full"
                    justifyContent="start"
                  >
                    <Link to={paths.user.about}>
                      <Icon>
                        <LibraryBigIcon />
                      </Icon>
                      {t('navigation.about')}
                    </Link>
                  </Button>
                </Box>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
