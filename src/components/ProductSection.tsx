import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import Product from "../@types/product";
import ProductCard from "./ProductCard";

type Props = {
  sectionTitle?: string;
  products: Product[];
};

const Section = styled.section`
  display: grid;
  gap: 1rem;
  padding: 2rem 1.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.md};
  font-weight: normal;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.heading.xl};
  }
`;

const Display = styled.div`
  display: grid;
  gap: 1rem 1.25rem;

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
`;

const Link = styled(RouterLink)`
  font-family: ${({ theme }) => theme.typography.font.body};
  text-decoration: none;
  text-align: center;

  padding: 1rem 2rem;

  color: inherit;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  @media (min-width: 768px) {
    justify-self: center;
  }
`;

const ProductSection = ({ sectionTitle, products }: Props) => {
  return (
    <Section>
      {sectionTitle && <Title>{sectionTitle}</Title>}
      <Display>
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </Display>
      <Link to="/">Ver coleção</Link>
    </Section>
  );
};

export default ProductSection;
