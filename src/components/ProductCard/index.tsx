import { TProduct } from "../../@types/product";
import Typography from "../Typography";
import * as Styled from "./styles";

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Styled.Link to={`/produtos/${product.uid}`}>
      <Styled.Image src={product.images[0]} alt="" />
      <Styled.Details>
        <Typography
          component="h3"
          fontFamily="heading"
          fontSize={{ _: "lg", lg: "xl" }}
          width={1}
          overflow="hidden"
          style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
        >
          {product.name}
        </Typography>
        <Typography fontSize={{ _: "sm", lg: "lg" }}>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Typography>
      </Styled.Details>
    </Styled.Link>
  );
};

export default ProductCard;
