import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { ShoppingCart } from "@phosphor-icons/react";
import CartMenu from "../CartMenu";
import * as Styled from "./styles";

const CartButton = () => {
  const { colors } = useTheme();

  return (
    <>
      <Styled.MobileButton component={Link} to="/carrinho">
        <ShoppingCart color={colors.text.primary} size={24} />
      </Styled.MobileButton>
      <CartMenu />
    </>
  );
};

export default CartButton;
