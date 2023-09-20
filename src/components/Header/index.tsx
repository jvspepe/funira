import { useTheme } from "styled-components";
import { MagnifyingGlass } from "@phosphor-icons/react";
import useGetCategories from "../../hooks/useGetCategories";
import Nav from "../NavbarDesktop";
import MobileNav from "../Navbar";
import IconButton from "../IconButton";
import ActionUser from "../ActionUser";
import ActionCart from "../ActionCart";
import * as S from "./styles";
import Typography from "../Typography";
import { Link } from "react-router-dom";

const Header = () => {
  const { colors } = useTheme();
  const categories = useGetCategories();

  return (
    <S.Wrapper>
      <Typography component={Link} to="/" fontFamily="heading" fontSize="2xl">
        Avion
      </Typography>
      <Nav routes={categories} />
      <S.Controls>
        <IconButton type="button">
          <MagnifyingGlass color={colors.text.primary} size={24} />
        </IconButton>
        <ActionCart />
        <ActionUser />
        <MobileNav routes={categories} />
      </S.Controls>
    </S.Wrapper>
  );
};

export default Header;
