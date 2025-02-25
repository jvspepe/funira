import { HouseLine } from '@phosphor-icons/react';
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
          <S.Logo to="/">
            <HouseLine weight="fill" />
            Funira
          </S.Logo>
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
