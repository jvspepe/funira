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
            <Typography
              component="h2"
              fontFamily="heading"
              fontSize={["2xl", null, "4xl"]}
            >
              {product.title}
            </Typography>
            <Typography
              component="span"
              fontFamily="heading"
              fontStyle={["xl", null, "2xl"]}
            >
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(product.price)}
            </Typography>
          </Styled.Header>
          <Styled.Description>
            <Typography fontFamily="heading">Descrição</Typography>
            <Typography size="sm">{product.description}</Typography>
          </Styled.Description>
          <Styled.Dimensions>
            <Typography fontFamily="heading">Dimensões</Typography>
            <Styled.DimensionsContent>
              <div>
                <Typography fontFamily="heading">Altura</Typography>
                <Typography fontSize="sm">
                  {product.dimensions?.height}cm
                </Typography>
              </div>
              <hr />
              <div>
                <Typography fontFamily="heading">Largura</Typography>
                <Typography size="sm">{product.dimensions?.width}cm</Typography>
              </div>
              <hr />
              <div>
                <Typography fontFamily="heading">Comprimento</Typography>
                <Typography size="sm">{product.dimensions?.depth}cm</Typography>
              </div>
            </Styled.DimensionsContent>
          </Styled.Dimensions>
          <Styled.Buttons>
            <Styled.Quantity>
              <Typography fontFamily="heading">Quantidade</Typography>
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
