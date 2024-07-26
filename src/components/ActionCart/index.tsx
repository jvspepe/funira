import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { ShoppingCart } from "@phosphor-icons/react";
import CartMenu from "@/components/CartMenu";
import Button from "./styles";

const ActionCart = () => {
  const { colors } = useTheme();

  return (
    <>
      <Button component={Link} to="/carrinho">
        <ShoppingCart color={colors.text.primary} size={24} />
      </Button>
      <CartMenu />
    </>
  );
};

export default ActionCart;
