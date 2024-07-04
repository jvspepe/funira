import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import Typography from "../Typography";

const Wrapper = styled.nav`
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.25rem;
  list-style: none;
`;

const MenuToggle = styled(Typography)`
  display: flex;
  padding: 0 0.25rem;

  align-items: center;
  gap: 0.25rem;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 300ms;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.border.primary};
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

const MenuDropdownItem = styled(Typography)`
  padding: 0.5rem;
  width: 100%;

  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

export { Wrapper, List, MenuToggle, MenuDropdown, MenuDropdownItem };
