import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import useGetCategories from '@/hooks/useGetCategories';
import ActionCart from '@/components/ActionCart';
import ActionUser from '@/components/ActionUser';
import Container from '@/components/ui/Container';
import MobileNav from '@/components/Navbar';
import Nav from '@/components/NavbarDesktop';
import * as S from './styles';

const Header = () => {
  const { categories } = useGetCategories();

  return (
    <S.Header>
      <Container>
        <S.Wrapper>
          <Link
            as={RouterLink}
            to="/"
            fontSize="1.5rem"
          >
            Funira
          </Link>
          <Box
            as="ul"
            display="flex"
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
              <Menu>
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
          <Nav routes={categories} />
          <S.Controls>
            <ActionCart />
            <ActionUser />
            <MobileNav routes={categories} />
          </S.Controls>
        </S.Wrapper>
      </Container>
    </S.Header>
  );
};

export default Header;
