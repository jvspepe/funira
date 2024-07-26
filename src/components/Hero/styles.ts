import { styled } from "styled-components";
import BaseContainer from "../ui/Container";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: #f6f6f6;
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: 50%;
`;

const Container = styled(BaseContainer)`
  height: calc(100dvh - 5.25rem);
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.sm}) {
    align-items: end;
    justify-content: center;
  }
`;

const Section = styled.section`
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${breakpoints.sm}) {
    padding: 3rem 4rem;
    gap: 10rem;
    align-items: start;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.sm}) {
    gap: 1.5rem;
  }
`;

const ContentHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const ContentBody = styled.p`
  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Image = styled.img`
  flex-grow: 1;
  object-fit: cover;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export {
  Wrapper,
  Container,
  Section,
  Content,
  ContentHeader,
  ContentBody,
  Image,
};
