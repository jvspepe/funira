import { styled } from "styled-components";
import font from "../../styles/font";
import breakpoints from "../../styles/breakpoints";
import BaseContainer from "../Container";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};

  @media (min-width: ${breakpoints.md}) {
    padding: 2rem 0;
  }
`;

const Container = styled(BaseContainer)`
  display: grid;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size["2xl"]};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["4xl"]};
  }
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};

  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["2xl"]};
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Dimensions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  @media (min-width: ${breakpoints.lg}) {
    flex-grow: 1;
  }
`;

const DimensionsContent = styled.div`
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.lg}) {
    align-items: end;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export {
  Wrapper,
  Container,
  Image,
  Details,
  Header,
  Title,
  Price,
  Description,
  Dimensions,
  DimensionsContent,
  Buttons,
  Quantity,
};
