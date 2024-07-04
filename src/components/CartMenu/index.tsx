import { useState } from "react";
import { useTheme } from "styled-components";
import { ShoppingCart } from "@phosphor-icons/react";
import { useAppSelector } from "@/store/store";
import CartMenuItem from "@/components/CartMenuItem";
import IconButton from "@/components/IconButton";
import Menu from "@/components/Menu";
import Typography from "@/components/Typography";
import Wrapper from "./styles";

const CartMenu = () => {
  const { colors } = useTheme();
  const { cart } = useAppSelector((state) => state.cartReducer);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="right"
      display={["none", null, "block"]}
      toggle={
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <ShoppingCart color={colors.text.primary} size={24} />
        </IconButton>
      }
    >
      <Wrapper>
        {cart && cart.length > 1 ? (
          cart.map((item) => <CartMenuItem key={item.uid} product={item} />)
        ) : (
          <Typography
            fontFamily="heading"
            fontSize="lg"
            textAlign="center"
            p="0.5rem"
          >
            Carrinho vazio
          </Typography>
        )}
      </Wrapper>
    </Menu>
  );
};

export default CartMenu;
