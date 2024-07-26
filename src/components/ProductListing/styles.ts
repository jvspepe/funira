import { styled } from "styled-components";
import breakpoints from "@/styles/breakpoints";
import BaseContainer from "@/components/ui/Container";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};

  @media (min-width: ${breakpoints.md}) {
  }
`;

const Container = styled(BaseContainer)`
  display: grid;

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 2rem 0;
    height: calc(100dvh - 5.25rem);
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${breakpoints.sm}) {
    padding: 1.5rem 0;
  }

  @media (min-width: ${breakpoints.md}) {
    padding: 2.5rem;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: normal;

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }
`;

const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }
`;

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProductDescriptionHeading = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ProductDescriptionContent = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ProductDimensions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  @media (min-width: ${breakpoints.lg}) {
    flex-grow: 1;
  }
`;

const ProductDimensionsHeading = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ProductDimensionsContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  div:first-child {
    text-align: start;
  }

  div:last-child {
    text-align: end;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const ProductDimensionHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: normal;
`;

const ProductDimensionContent = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.lg}) {
    align-items: end;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export {
  Wrapper,
  Container,
  Image,
  Details,
  ProductHeader,
  ProductName,
  ProductPrice,
  ProductDescription,
  ProductDescriptionHeading,
  ProductDescriptionContent,
  ProductDimensions,
  ProductDimensionsHeading,
  ProductDimensionsContent,
  ProductDimensionHeader,
  ProductDimensionContent,
  Controls,
};
