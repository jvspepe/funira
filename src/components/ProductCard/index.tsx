import { TProduct } from "../../@types/product";
import * as Styled from "./styles";
type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Styled.Link to={`/produtos/${product.uid}`}>
      <Styled.Image src={product.images[0]} alt="" />
      <Styled.Details>
        <Styled.Heading>{product.title}</Styled.Heading>
        <Styled.Price>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Styled.Price>
      </Styled.Details>
    </Styled.Link>
  );
};

export default ProductCard;
