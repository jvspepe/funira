import { Link } from "react-router-dom";
import { styled } from "styled-components";
import breakpoints from "@/styles/breakpoints";

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

const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
`;

const FooterListHeading = styled.h6`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FooterListContent = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export {
  Footer,
  FooterContainer,
  FooterList,
  FooterListHeading,
  FooterListContent,
};
