import { NavLink, Link as RouterLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Menu,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { paths } from '@/config/paths';
import { getCategories } from '@/features/categories/services';
import { CartDrawer } from '@/components/cart-drawer';
import { MobileDrawer } from '@/components/mobile-drawer';
import { UserMenu } from '@/components/user-menu';

export function Header() {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      maxHeight="{sizes.22}"
      zIndex={99}
      backgroundColor="white"
      boxShadow="0 1px 2px 0 rgb(0 0 0 / 0.05)"
    >
      <Container>
        <Flex
          align="center"
          justify="space-between"
          paddingY="{spacing.6}"
        >
          <Link
            asChild
            fontSize="{spacing.6}"
          >
            <RouterLink to={paths.user.home}>Funira</RouterLink>
          </Link>
          <Box
            as="ul"
            display={{ base: 'none', md: 'flex' }}
            gap="2rem"
            listStyleType="none"
          >
            <Box as="li">
              <Link asChild>
                <NavLink to={paths.user.home}>Início</NavLink>
              </Link>
            </Box>
            <Box as="li">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Link asChild>
                    <Button
                      type="button"
                      unstyled
                    >
                      Produtos
                    </Button>
                  </Link>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {categoriesQuery.isLoading ? (
                        <Flex
                          align="center"
                          justify="center"
                        >
                          <Spinner />
                        </Flex>
                      ) : !categoriesQuery.data ? (
                        'Nenhuma categoria encontrada'
                      ) : (
                        <>
                          <Menu.Item
                            asChild
                            value="produtos"
                          >
                            <RouterLink to={paths.user.products}>
                              Ver todos
                            </RouterLink>
                          </Menu.Item>
                          {categoriesQuery.data.map((category) => (
                            <Menu.Item
                              key={category.id}
                              asChild
                              value={category.value}
                            >
                              <RouterLink
                                to={`${paths.user.products}?tipo=${category.value}`}
                              >
                                {category.label.pt}
                              </RouterLink>
                            </Menu.Item>
                          ))}
                        </>
                      )}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
            <Box as="li">
              <Link asChild>
                <NavLink to={paths.user.about}>Sobre</NavLink>
              </Link>
            </Box>
          </Box>
          <Flex
            align="center"
            gap="{spacing.2}"
          >
            <CartDrawer />
            <UserMenu />
            <MobileDrawer categories={categoriesQuery.data ?? []} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
