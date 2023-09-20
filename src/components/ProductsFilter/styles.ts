import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

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
`;

const Content = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export { Wrapper, WrapperDesktop, Header, Content, List };
