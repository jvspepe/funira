import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  Portal,
} from '@chakra-ui/react';
import { CircleUserRound } from 'lucide-react';
import { logoutUser } from '@/lib/auth';
import useAuth from '@/contexts/auth/hooks';
import useGetCategories from '@/hooks/useGetCategories';
import CartDrawer from '@/components/CartDrawer';
import MobileDrawer from '@/components/MobileDrawer';

const Header = () => {
  const { currentUser } = useAuth();
  const { categories } = useGetCategories();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();

      navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex={99}
      bgColor="#FAFAFA"
    >
      <Container
        maxWidth={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        }}
        padding={0}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding={{ base: '1.5rem', md: '1.5rem 0' }}
        >
          <Link
            asChild
            fontSize="1.5rem"
          >
            <RouterLink to="/">Funira</RouterLink>
          </Link>
          <Box
            as="ul"
            display={{ base: 'none', md: 'flex' }}
            gap="2rem"
            listStyleType="none"
          >
            <Box as="li">
              <Link asChild>
                <RouterLink to="/">Início</RouterLink>
              </Link>
            </Box>
            <Box as="li">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="plain">Produtos</Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        asChild
                        value="produtos"
                      >
                        <RouterLink to="/produtos">Ver todos</RouterLink>
                      </Menu.Item>
                      {categories.map((category) => (
                        <Menu.Item
                          key={category.label}
                          asChild
                          value={category.label}
                        >
                          <RouterLink to={`produtos?tipo=${category.value}`}>
                            {category.label}
                          </RouterLink>
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
            <Box as="li">
              <Link asChild>
                <RouterLink to="/sobre">Sobre</RouterLink>
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <CartDrawer />
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  aria-label="Menu de usuário"
                  variant="ghost"
                  display={{ base: 'none', lg: 'flex' }}
                >
                  <CircleUserRound />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {!currentUser ? (
                      <>
                        <Menu.Item
                          asChild
                          value="conectar"
                        >
                          <RouterLink to="/conectar">Conectar</RouterLink>
                        </Menu.Item>
                        <Menu.Item
                          asChild
                          value="criar-conta"
                        >
                          <RouterLink to="/criar-conta">Criar Conta</RouterLink>
                        </Menu.Item>
                      </>
                    ) : (
                      <Menu.Item
                        onClick={handleSignOut}
                        value="sign-out"
                      >
                        Sair
                      </Menu.Item>
                    )}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <MobileDrawer categories={categories} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
