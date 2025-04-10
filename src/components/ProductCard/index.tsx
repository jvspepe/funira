import { TProduct } from '@/@types/product';
import * as S from './styles';

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <S.Link to={`/produtos/${product.id}`}>
      <S.Image
        src={product.images[0]}
        alt=""
      />
      <S.Details>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductPrice>
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(product.price)}
        </S.ProductPrice>
      </S.Details>
    </S.Link>
  );
};

export default ProductCard;
