import { styled } from "styled-components";
import breakpoints from "@/styles/breakpoints";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem;
  gap: 2rem;

  @media (min-width: ${breakpoints.sm}) {
    padding: 3rem 0;
  }
`;

const SectionHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: normal;
  align-self: center;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
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

export { Section, SectionHeader, Display };
