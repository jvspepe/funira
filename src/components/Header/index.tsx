import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
      zIndex={9999}
      bgColor="#FAFAFA"
    >
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1440px',
        }}
        p={0}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="1.5rem"
        >
          <Link
            as={RouterLink}
            to="/"
            fontSize="1.5rem"
          >
            Funira
          </Link>
          <Box
            as="ul"
            display={{ base: 'none', md: 'flex' }}
            gap="2rem"
            listStyleType="none"
          >
            <Box as="li">
              <Link
                as={RouterLink}
                to="/"
              >
                Início
              </Link>
            </Box>
            <Box as="li">
              <Menu placement="bottom">
                <MenuButton
                  as={Button}
                  variant="link"
                >
                  Produtos
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to="/produtos"
                  >
                    Ver todos
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.label}
                      as={RouterLink}
                      to={`produtos?tipo=${category.value}`}
                    >
                      {category.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <Box as="li">
              <Link
                as={RouterLink}
                to="/sobre"
              >
                Sobre
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <CartDrawer />
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                aria-label="Menu de usuário"
                variant="ghost"
                icon={<CircleUserRound />}
                display={{ base: 'none', lg: 'flex' }}
              />
              <MenuList>
                {!currentUser ? (
                  <>
                    <MenuItem
                      as={RouterLink}
                      to="/conectar"
                    >
                      Conectar
                    </MenuItem>
                    <MenuItem
                      as={RouterLink}
                      to="/criar-conta"
                    >
                      Criar Conta
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleSignOut}>Sair</MenuItem>
                )}
              </MenuList>
            </Menu>
            <MobileDrawer categories={categories} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
