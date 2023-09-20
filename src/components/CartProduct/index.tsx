import { useState } from "react";
import { TCartProduct } from "../../@types/product";
import * as Styled from "./styles";
import Typography from "../Typography";
import Stepper from "../Stepper";

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
          <Typography fontFamily="heading" fontSize={["md", "lg,"]}>
            {product.title}
          </Typography>
          <Typography fontSize="sm">{product.description}</Typography>
          <Typography>
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(product.price)}
          </Typography>
        </Styled.Information>
        <Stepper value={value} setValue={setValue} />
        <Typography display={["none", null, "block"]}>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Typography>
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
};

export default CartProduct;
