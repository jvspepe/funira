import { Cart, ProfileCircle, Search } from "iconoir-react";
import { styled, useTheme } from "styled-components";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import Button from "../styles/Button.styles";

const navRoutes = [
  "Móveis",
  "Eletrodomésticos",
  "Eletroportáteis",
  "TVs e Vídeo",
];

const Root = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.lg};
  text-decoration: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  const { colors } = useTheme();
  return (
    <Root>
      <Brand to="/">Avion</Brand>
      <Nav routes={navRoutes} />
      <ButtonsContainer>
        <Button type="button">
          <Search color={colors.text.primary} height={20} width={20} />
        </Button>
        <Button type="button">
          <Cart color={colors.text.primary} height={20} width={20} />
        </Button>
        <Button type="button">
          <ProfileCircle color={colors.text.primary} height={20} width={20} />
        </Button>
        <MobileNav routes={navRoutes} />
      </ButtonsContainer>
    </Root>
  );
};

export default Header;
