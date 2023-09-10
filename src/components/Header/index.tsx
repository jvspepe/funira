import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { firestore } from "../../api/firebase/firebase-config";
import { getCategories } from "../../api/firebase/firestore/categories";
import { TCategory } from "../../@types/categories";
import Nav from "../NavbarDesktop";
import MobileNav from "../Navbar";
import IconButton from "../IconButton";
import UserMenu from "../MenuUser";
import * as S from "./styles";

const Header = () => {
  const { colors } = useTheme();
  const [categories, setCategories] = useState<TCategory[]>([]);

  async function getAllCategories() {
    try {
      const databaseCategories = await getCategories(firestore);
      setCategories(databaseCategories);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <S.Wrapper>
      <S.Brand to="/">Avion</S.Brand>
      <Nav routes={categories} />
      <S.Controls>
        <IconButton type="button">
          <MagnifyingGlass color={colors.text.primary} size={24} />
        </IconButton>
        <IconButton component={Link} to="/carrinho">
          <ShoppingCart color={colors.text.primary} size={24} />
        </IconButton>
        <UserMenu />
        <MobileNav routes={categories} />
      </S.Controls>
    </S.Wrapper>
  );
};

export default Header;
