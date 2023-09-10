import { Link } from "react-router-dom";
import CartProduct from "../../components/CartProduct";
import * as Styled from "./styles";
import { useTheme } from "styled-components";
import { useAppSelector } from "../../store/store";

const Cart = () => {
  const { cart, total } = useAppSelector((state) => state.cartReducer);
  const { colors } = useTheme();
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Title>Seu carrinho</Styled.Title>
        <hr style={{ border: `1px solid ${colors.border.primary}` }} />
        {cart.length !== 0 ? (
          <Styled.InnerContainer>
            {cart.map((item) => (
              <CartProduct key={item.uid} product={item} />
            ))}
          </Styled.InnerContainer>
        ) : (
          <Styled.Title>O Carrinho está vázio...</Styled.Title>
        )}
        <hr
          style={{
            border: `1px solid ${colors.border.primary}`,
            marginTop: "auto",
          }}
        />
        <Styled.PriceContainer>
          <span>Total</span>
          <span>
            {" "}
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(total)}
          </span>
        </Styled.PriceContainer>
        <Styled.Button component={Link} to="/">
          Finalizar compra
        </Styled.Button>
      </Styled.Wrapper>
    </Styled.Container>
  );
};

export default Cart;
