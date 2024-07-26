import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Section = styled.section`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    padding-inline: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: ${({ theme }) => theme.colors.background.primary};
  background-color: ${({ theme }) => theme.colors.text.primary};
  padding: 2rem 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    align-items: start;
  }
`;

const Heading = styled.h5`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-grow: 1;

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Image = styled.img`
  object-fit: cover;
`;

export { Section, Wrapper, Heading, Content, Image };
