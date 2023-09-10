import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 1rem;
  padding-block: 1.25rem;
  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
    padding-inline: 0;
  }
`;

const WrapperDesktop = styled.div`
  display: none;
  justify-content: space-between;
  padding: 0.5rem 0;

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

  & h3 {
    font-family: ${font.family.heading};
    font-size: ${font.size["4xl"]};
    font-weight: normal;
  }
`;

const Content = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export { Wrapper, WrapperDesktop, Header, Content, Title, List };
