import { styled } from "styled-components";
import Container from "./Container";
import Product from "../@types/product";
import ProductCard from "./ProductCard";
import Button from "./Button";
import font from "../styles/font";

type Props = {
  sectionTitle?: string;
  products: Product[];
  route?: string;
};

const StyledButton = styled(Button)``;

const Section = styled.section`
  display: grid;
  gap: 1rem;

  padding-block: 2rem;
  padding-inline: 1.5rem;

  ${StyledButton} {
    justify-self: center;
  }

  @media (min-width: 641px) {
    gap: 2rem;
    padding-inline: 0;
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;

  @media (min-width: 641px) {
    font-size: ${font.size["3xl"]};
  }
`;

const Display = styled.div`
  display: grid;
  gap: 1rem 1.25rem;

  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
`;

const ProductSection = ({ sectionTitle, products, route }: Props) => {
  return (
    <Container>
      <Section>
        {sectionTitle && <Title>{sectionTitle}</Title>}
        <Display>
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </Display>
        {route && (
          <StyledButton variant="secondary" to={route}>
            Ver coleção
          </StyledButton>
        )}
      </Section>
    </Container>
  );
};

export default ProductSection;
