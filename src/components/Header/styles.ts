import breakpoints from "@/styles/breakpoints";
import { styled } from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    padding-inline: 0;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export { Header, Wrapper, List, Controls };
