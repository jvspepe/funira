import { Link } from "react-router-dom";
import { styled } from "styled-components";
import breakpoints from "@/styles/breakpoints";

const NavList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  height: 0;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
  list-style: none;
  visibility: hidden;
  overflow-y: auto;
  transition: 500ms;
  z-index: 99;
`;

const NavListItem = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  width: 100%;
  padding: 1.5rem;

  transition: background-color 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Accordion = styled.div`
  position: relative;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
`;

const AccordionButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  padding: 1.5rem;

  transition: background-color 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const AccordionContent = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-out;

  & > * {
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  }

  & li {
    display: flex;
  }
`;

const Wrapper = styled.nav`
  display: flex;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }

  &[data-active="true"] ${NavList} {
    display: flex;
    height: calc(100dvh - 100%);
    visibility: visible;
  }
`;

export {
  Wrapper,
  NavList,
  NavListItem,
  Accordion,
  AccordionButton,
  AccordionContent,
  NavLink,
};
