import { useState } from "react";
import { useTheme } from "styled-components";
import { ShoppingCart } from "@phosphor-icons/react";
import { useAppSelector } from "@/store/store";
import CartMenuItem from "@/components/CartMenuItem";
import IconButton from "@/components/ui/IconButton";
import Menu from "@/components/ui/Menu";
import * as S from "./styles";

const CartMenu = () => {
  const { colors } = useTheme();
  const { cart } = useAppSelector((state) => state.cartReducer);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Wrapper>
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
        <S.MenuContent>
          {cart.length >= 1 ? (
            cart.map((item) => <CartMenuItem key={item.uid} product={item} />)
          ) : (
            <S.MenuMessage>Carrinho vazio</S.MenuMessage>
          )}
        </S.MenuContent>
      </Menu>
    </S.Wrapper>
  );
};

export default CartMenu;
