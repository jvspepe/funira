import { useState } from "react";
import { TCartProduct } from "../../@types/product";
import Stepper from "../Stepper";
import * as Styled from "./styles";
import IconButton from "../IconButton";
import { X } from "@phosphor-icons/react";
import { useAppDispatch } from "../../store/store";
import { removeFromCart } from "../../store/cartSlice";
import Typography from "../Typography";

type Props = { product: TCartProduct };

const CartMenuItem = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);
  const dispatch = useAppDispatch();
  return (
    <Styled.Wrapper>
      <Styled.Image src={product.images[0]} alt="" />
      <Styled.InnerWrapper>
        <Typography fontFamily="heading">{product.name}</Typography>
        <Typography component="span" fontFamily="heading" fontSize="sm">
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Typography>
        <Styled.Buttons>
          <Stepper
            value={value}
            setValue={setValue}
            minValue={1}
            size="small"
          />
          <IconButton onClick={() => dispatch(removeFromCart(product.uid))}>
            <X size={20} />
          </IconButton>
        </Styled.Buttons>
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
};

export default CartMenuItem;
