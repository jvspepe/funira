import Product from "../../@types/product";
import * as Styled from "./styles";
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Styled.Link to={`/produtos/${product.uid}`}>
      <Styled.Image src={product.images[0]} alt="" />
      <Styled.Details>
        <Styled.Heading>
          {product.title.split(" ").slice(0, 3).join(" ")}...
        </Styled.Heading>
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
