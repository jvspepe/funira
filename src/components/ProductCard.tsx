import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import Product from "../@types/product";

type Props = {
  product: Product;
};

const Link = styled(RouterLink)`
  display: grid;
  grid-template-rows: auto min-content;
  gap: 1.5rem;
  text-decoration: none;
`;

const Image = styled.img`
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.sm};
  font-weight: normal;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: ${({ theme }) => theme.typography.body.md};
`;

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={product.uid}>
      <Image src={product.thumbnail} alt="" />
      <Details>
        <Title>{product.title}</Title>
        <Price>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(product.price)}
        </Price>
      </Details>
    </Link>
  );
};

export default ProductCard;
