import { useState } from "react";
import { X } from "@phosphor-icons/react";
import { useAppDispatch } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import { TCartProduct } from "@/@types/product";
import IconButton from "@/components/ui/IconButton";
import Stepper from "@/components/ui/Stepper";
import * as S from "./styles";

type Props = { product: TCartProduct };

const CartMenuItem = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);
  const dispatch = useAppDispatch();

  return (
    <S.Wrapper>
      <S.Image src={product.images[0]} alt="" />
      <S.ItemWrapper>
        <S.ItemHeader>{product.name}</S.ItemHeader>
        <S.ItemPrice>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </S.ItemPrice>
        <S.Controls>
          <Stepper
            value={value}
            setValue={setValue}
            minValue={1}
            size="small"
          />
          <IconButton onClick={() => dispatch(removeFromCart(product.uid))}>
            <X size={20} />
          </IconButton>
        </S.Controls>
      </S.ItemWrapper>
    </S.Wrapper>
  );
};

export default CartMenuItem;
