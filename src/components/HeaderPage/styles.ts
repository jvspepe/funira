import { styled } from "styled-components";

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

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export { Wrapper, Heading };
