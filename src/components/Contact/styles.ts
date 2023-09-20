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

const Image = styled.img`
  object-fit: cover;
`;

export { Section, Wrapper, Image };
