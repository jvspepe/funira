import { useState } from "react";
import { TCartProduct } from "@/@types/product";
import Stepper from "@/components/ui/Stepper";
import * as S from "./styles";

type Props = {
  product: TCartProduct;
};

const CartProduct = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);

  return (
    <S.Wrapper>
      <S.Image src={product.images[0]} alt="" />
      <S.InnerWrapper>
        <S.ProductInformation>
          <S.ProductHeading>{product.name}</S.ProductHeading>
          <S.ProductDescription>{product.description}</S.ProductDescription>
          <span>
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(product.price)}
          </span>
        </S.ProductInformation>
        <Stepper value={value} setValue={setValue} />
        <S.ProductPrice>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </S.ProductPrice>
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default CartProduct;
