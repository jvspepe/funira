import { styled } from "styled-components";
import font from "../styles/font";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  background-image: url("/images/product-header.jpg");
  background-size: cover;
  background-position: center;
  padding-block: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-family: ${font.family.heading};
  font-size: ${font.size["4xl"]};
  font-weight: normal;
  text-align: center;
`;

const ProductsHeader = () => {
  return (
    <Wrapper>
      <Title>Nossos produtos</Title>
    </Wrapper>
  );
};

export default ProductsHeader;
