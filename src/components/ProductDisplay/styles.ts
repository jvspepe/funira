import { styled } from "styled-components";
import font from "../../styles/font";
import breakpoints from "../../styles/breakpoints";
import BaseButton from "../Button";

const Section = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1rem 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    gap: 2rem;
    padding: 1rem 0;
  }
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["3xl"]};
  }
`;

const Display = styled.div`
  display: grid;
  gap: 1rem 1.25rem;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
`;

const Button = styled(BaseButton)`
  @media (min-width: ${breakpoints.sm}) {
    justify-self: center;
  }
`;

export { Section, Heading, Display, Button };
