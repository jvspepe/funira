import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Footer = styled.footer`
  display: grid;
  gap: 1.25rem;
  padding-block: 2.5rem 1.5rem;
  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    padding-inline: 0;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  padding-bottom: 1rem;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
  }
`;

export { Footer, FooterContainer };
