import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addToCart } from "../../store/cartSlice";
import { TProduct } from "../../@types/product";
import Button from "../Button";
import Stepper from "../Stepper";
import Typography from "../Typography";
import * as Styled from "./styles";

type Props = { product: TProduct };

const ProductListing = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: TProduct) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Image src={product.images[0]} alt="" />
        <Styled.Details>
          <Styled.Header>
            <Styled.Title>{product.title}</Styled.Title>
            <Styled.Price>
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(product.price)}
            </Styled.Price>
          </Styled.Header>
          <Styled.Description>
            <Typography font="heading">Descrição</Typography>
            <Typography size="sm">{product.description}</Typography>
          </Styled.Description>
          <Styled.Dimensions>
            <Typography font="heading">Dimensões</Typography>
            <Styled.DimensionsContent>
              <div>
                <Typography font="heading">Altura</Typography>
                <Typography size="sm">
                  {product.dimensions?.height}cm
                </Typography>
              </div>
              <hr />
              <div>
                <Typography font="heading">Largura</Typography>
                <Typography size="sm">{product.dimensions?.width}cm</Typography>
              </div>
              <hr />
              <div>
                <Typography font="heading">Comprimento</Typography>
                <Typography size="sm">{product.dimensions?.depth}cm</Typography>
              </div>
            </Styled.DimensionsContent>
          </Styled.Dimensions>
          <Styled.Buttons>
            <Styled.Quantity>
              <Typography font="heading">Quantidade</Typography>
              <Stepper
                value={quantity}
                setValue={setQuantity}
                minValue={1}
                maxValue={product.stock}
              />
            </Styled.Quantity>
            <Button onClick={() => handleAddToCart(product)} type="button">
              Adicionar ao carrinho
            </Button>
          </Styled.Buttons>
        </Styled.Details>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default ProductListing;
