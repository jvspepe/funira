import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 1rem;

  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
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

export { Wrapper, Header, Content, List };
