import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import BaseButton from "../ui/Button";

const Section = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1rem 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    gap: 2rem;
    padding: 1rem 0;
  }
`;

const SectionHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
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

export { Section, SectionHeader, Display, Button };
