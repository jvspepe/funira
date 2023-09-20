import { styled } from "styled-components";
import Typography from "../Typography";

const NavList = styled.ul`
  position: absolute;
  top: 5rem;
  right: 0;
  height: 0;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
  list-style: none;
  visibility: hidden;
  overflow-y: hidden;
  transition: 500ms;
  z-index: 999;
`;

const NavListItem = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  align-items: center;
`;

const NavLink = styled(Typography)`
  width: 100%;
  padding: 1.5rem;

  transition: background-color 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Wrapper = styled.nav`
  display: none;

  @media (width <= 768px) {
    display: flex;
  }

  &[data-active="true"] ${NavList} {
    display: flex;
    height: calc(100dvh - 5rem);
    visibility: visible;
    overflow-y: auto;
  }
`;

export { Wrapper, NavList, NavListItem, NavLink };
