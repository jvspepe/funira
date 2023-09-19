import { useState } from "react";
import { useTheme } from "styled-components";
import { ShoppingCart } from "@phosphor-icons/react";
import { useAppSelector } from "../../store/store";
import Menu from "../Menu";
import IconButton from "../IconButton";
import CartMenuItem from "../CartMenuItem";
import * as Styled from "./styles";

const CartMenu = () => {
  const { colors } = useTheme();
  const { cart } = useAppSelector((state) => state.cartReducer);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="right"
      toggle={
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <ShoppingCart color={colors.text.primary} size={24} />
        </IconButton>
      }
    >
      <Styled.Wrapper>
        {cart && cart.length > 1 ? (
          cart.map((item) => <CartMenuItem key={item.uid} product={item} />)
        ) : (
          <Styled.Text>Carrinho vazio</Styled.Text>
        )}
      </Styled.Wrapper>
    </Menu>
  );
};

export default CartMenu;
