import { useState } from "react";
import { TCartProduct } from "../../@types/product";
import * as Styled from "./styles";

type Props = {
  product: TCartProduct;
};

const CartProduct = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);

  return (
    <Styled.Wrapper>
      <Styled.Image src={product.images[0]} alt="" />
      <Styled.InnerWrapper>
        <Styled.Information>
          <Styled.Title>{product.title}</Styled.Title>
          <Styled.Description>{product.description}</Styled.Description>
          <Styled.Price>
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(product.price)}
          </Styled.Price>
        </Styled.Information>
        <Styled.Stepper value={value} setValue={setValue} />
        <Styled.OuterPrice>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Styled.OuterPrice>
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
};

export default CartProduct;
