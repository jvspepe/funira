import { MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { useTheme } from "styled-components";
import Nav from "../Nav";
import MobileNav from "../Navbar";
import IconButton from "../IconButton";
import UserMenu from "../MenuUser";
import * as S from "./styles";

const routes = [
  {
    path: "/produtos",
    label: "Cerâmicas",
  },
  {
    path: "/",
    label: "Utensílios de mesa",
  },
  {
    path: "/",
    label: "Mesas",
  },
  {
    path: "/",
    label: "Cadeiras",
  },
  {
    path: "/",
    label: "Armários",
  },
  {
    path: "/",
    label: "Camas",
  },
];

const Header = () => {
  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <S.Brand to="/">Avion</S.Brand>
      <Nav routes={routes} />
      <S.Controls>
        <IconButton type="button">
          <MagnifyingGlass color={colors.text.primary} size={24} />
        </IconButton>
        <IconButton type="button">
          <ShoppingCart color={colors.text.primary} size={24} />
        </IconButton>
        <UserMenu />
        <MobileNav routes={routes} />
      </S.Controls>
    </S.Wrapper>
  );
};

export default Header;
