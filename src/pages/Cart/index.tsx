import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { useAppSelector } from "@/store/store";
import CartProduct from "@/components/CartProduct";
import Typography from "@/components/ui/Typography";
import * as Styled from "./styles";

const Cart = () => {
  const { cart, total } = useAppSelector((state) => state.cartReducer);
  const { colors } = useTheme();

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Typography component="h2" fontFamily="heading" fontSize="2xl">
          Seu carrinho
        </Typography>
        <hr style={{ border: `1px solid ${colors.border.primary}` }} />
        {cart.length !== 0 ? (
          <Styled.InnerContainer>
            {cart.map((item) => (
              <CartProduct key={item.uid} product={item} />
            ))}
          </Styled.InnerContainer>
        ) : (
          <Typography component="h2" fontFamily="heading" fontSize="2xl">
            O Carrinho está vázio...
          </Typography>
        )}
        <hr
          style={{
            border: `1px solid ${colors.border.primary}`,
            marginTop: "auto",
          }}
        />
        <Styled.PriceContainer>
          <Typography component="span" fontFamily="heading" fontSize="xl">
            Total
          </Typography>
          <Typography component="span" fontFamily="heading" fontSize="xl">
            {" "}
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(total)}
          </Typography>
        </Styled.PriceContainer>
        <Styled.Button component={Link} to="/">
          Finalizar compra
        </Styled.Button>
      </Styled.Wrapper>
    </Styled.Container>
  );
};

export default Cart;
