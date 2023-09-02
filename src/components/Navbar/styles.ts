import { Link } from "react-router-dom";
import { styled } from "styled-components";
import font from "../../styles/font";

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
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${font.family.body};
  text-decoration: none;
  width: 100%;
  padding: 1rem;
  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Wrapper = styled.nav`
  display: none;
  @media (max-width: 768px) {
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
