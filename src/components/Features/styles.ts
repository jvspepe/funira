import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import font from "../../styles/font";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem;
  gap: 2rem;

  @media (min-width: ${breakpoints.sm}) {
    padding: 3rem 0;
  }
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;

  @media (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: ${font.size["2xl"]};
  }
`;

const Display = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export { Section, Heading, Display };
