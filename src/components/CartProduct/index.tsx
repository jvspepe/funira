import { useState } from "react";
import { TCartProduct } from "@/@types/product";
import Typography from "@/components/ui/Typography";
import Stepper from "@/components/ui/Stepper";
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
          <Typography fontFamily="heading" fontSize={["md", "lg,"]}>
            {product.name}
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
