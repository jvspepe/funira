import { styled } from "styled-components";
import BaseContainer from "../Container";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: #f6f6f6;
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: 50%;
`;

const Container = styled(BaseContainer)`
  height: calc(100vh - 5rem);
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
  padding: 2.5rem 1.5rem 0.5rem;
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

const Image = styled.img`
  flex-grow: 1;
  object-fit: cover;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export { Wrapper, Container, Section, Content, Image };
