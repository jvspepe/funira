import { styled } from "styled-components";
import font from "../../styles/font";
import BaseButton from "../../components/Button";
import BaseContainer from "../../components/Container";
import breakpoints from "../../styles/breakpoints";

const Container = styled(BaseContainer)`
  min-height: calc(100dvh - 5rem);

  display: flex;
  @media (min-width: ${breakpoints.sm}) {
    padding: 2rem 0;
    justify-content: center;
  }
  @media (min-width: ${breakpoints.lg}) {
    padding: 4rem 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
  width: 100%;
  gap: 2rem;
  padding: 2rem 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size["2xl"]};
  font-weight: normal;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;
  align-self: end;

  & span:first-of-type {
    color: #4e4d93;
  }
`;

const Button = styled(BaseButton)`
  @media (min-width: ${breakpoints.md}) {
    align-self: end;
  }
`;

export {
  Container,
  Wrapper,
  Title,
  InnerContainer,
  Heading,
  PriceContainer,
  Button,
};
