import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Image = styled.img`
  max-width: 7.5rem;
  object-fit: cover;
`;

const ProductInformation = styled.div`
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: break-spaces;
  overflow: hidden;
  gap: 0.5rem;
`;

const ProductHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: normal;

  @media (min-width: ${breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ProductPrice = styled.span`
  display: none;

  @media (min-width: ${breakpoints.xl}) {
    display: block;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export {
  Wrapper,
  Image,
  InnerWrapper,
  ProductInformation,
  ProductHeading,
  ProductDescription,
  ProductPrice,
};
