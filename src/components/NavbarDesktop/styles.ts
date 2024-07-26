import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import breakpoints from "@/styles/breakpoints";

const Wrapper = styled.nav`
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;

  li {
    display: flex;
  }
`;

const Link = styled(RouterLink)`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text.tertiary};

  transition: color 200ms;
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MenuToggle = styled.button`
  background-color: transparent;
  border: none;

  position: relative;

  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text.tertiary};

  display: flex;
  align-items: center;
  gap: 0.25rem;

  cursor: pointer;
  transition: color 200ms;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MenuDropdown = styled.ul`
  display: grid;
  padding: 0.25rem;

  & li {
    display: flex;
  }

  & > *:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const MenuDropdownItem = styled(Link)`
  width: 100%;

  padding: 0.5rem;

  transition: background-color 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

export { Wrapper, List, Link, MenuToggle, MenuDropdown, MenuDropdownItem };
