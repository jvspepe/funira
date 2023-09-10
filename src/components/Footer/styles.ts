import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.text.primary};
`;

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

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

const MailForm = styled.form`
  flex-grow: 1;
`;

export { Wrapper, Footer, FooterContainer, ListContainer, MailForm };
