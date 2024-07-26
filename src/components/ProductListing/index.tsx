import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import { TProduct } from "@/@types/product";
import Button from "@/components/ui/Button";
import Stepper from "@/components/ui/Stepper";
import * as S from "./styles";

type Props = { product: TProduct };

const ProductListing = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: TProduct) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Image src={product.images[0]} alt="" />
        <S.Details>
          <S.ProductHeader>
            <S.ProductName>{product.name}</S.ProductName>
            <S.ProductPrice>
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(product.price)}
            </S.ProductPrice>
          </S.ProductHeader>
          <S.ProductDescription>
            <S.ProductDescriptionHeading>Descrição</S.ProductDescriptionHeading>
            <S.ProductDescriptionContent>
              {product.description}
            </S.ProductDescriptionContent>
          </S.ProductDescription>
          <S.ProductDimensions>
            <S.ProductDimensionsHeading>Dimensões</S.ProductDimensionsHeading>
            <S.ProductDimensionsContent>
              <div>
                <S.ProductDimensionHeader>Altura</S.ProductDimensionHeader>
                <S.ProductDimensionContent>
                  {product.dimensions?.height}cm
                </S.ProductDimensionContent>
              </div>
              <hr />
              <div>
                <S.ProductDimensionHeader>Largura</S.ProductDimensionHeader>
                <S.ProductDimensionContent>
                  {product.dimensions?.width}cm
                </S.ProductDimensionContent>
              </div>
              <hr />
              <div>
                <S.ProductDimensionHeader>Comprimento</S.ProductDimensionHeader>
                <S.ProductDimensionContent>
                  {product.dimensions?.depth}cm
                </S.ProductDimensionContent>
              </div>
            </S.ProductDimensionsContent>
          </S.ProductDimensions>
          <S.Controls>
            <Stepper
              value={quantity}
              setValue={setQuantity}
              minValue={1}
              label="Quantidade"
            />
            <Button onClick={() => handleAddToCart(product)} type="button">
              Adicionar ao carrinho
            </Button>
          </S.Controls>
        </S.Details>
      </S.Container>
    </S.Wrapper>
  );
};

export default ProductListing;
