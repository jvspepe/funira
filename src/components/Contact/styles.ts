import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import font from "../../styles/font";

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

const Title = styled.h5`
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["3xl"]};
  }
`;

const Details = styled.p`
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
  flex-grow: 1;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size.lg};
  }
`;

const Image = styled.img`
  height: 100%;
  align-self: start;
  object-fit: cover;
`;

export { Section, Wrapper, Title, Details, Image };
