import Product from "../../@types/product";
import * as S from "./styles";
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <S.Link to={product.uid}>
      <S.Image src={product.thumbnail} alt="" />
      <S.Details>
        <S.Title>{product.title}</S.Title>
        <S.Price>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </S.Price>
      </S.Details>
    </S.Link>
  );
};

export default ProductCard;
