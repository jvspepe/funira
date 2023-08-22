import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Cancel, Menu } from "iconoir-react";
import Button from "../styles/Button.styles";
import { Link } from "react-router-dom";

type Props = {
  routes: string[];
};

const NavList = styled.ul`
  position: absolute;
  top: 5rem;
  right: 0;

  height: 0;
  width: 100%;

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 10px solid ${({ theme }) => theme.colors.text.secondary};
  list-style: none;

  visibility: hidden;
  overflow-y: hidden;
  transition: 500ms;
  z-index: 9999;
`;

const NavListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.font.body};
  text-decoration: none;
  width: 100%;
  padding: 2rem;
  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Root = styled.nav`
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

const MobileNav = ({ routes }: Props) => {
  const [active, setActive] = useState(false);

  function handleActive() {
    setActive(!active);
  }

  useEffect(() => {
    if (active) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [active]);

  return (
    <Root data-active={active}>
      <Button
        onClick={handleActive}
        aria-label={active ? "Fechar menu" : "Abrir menu"}
        aria-haspopup="true"
        aria-controls="navigation-list"
        aria-expanded={active}
      >
        {active ? (
          <Cancel height={20} width={20} aria-hidden="true" />
        ) : (
          <Menu height={20} width={20} aria-hidden="true" />
        )}
      </Button>
      <NavList id="navigation-list" aria-hidden={!active}>
        {routes.map((route) => (
          <NavListItem key={route}>
            <NavLink to="/">{route}</NavLink>
          </NavListItem>
        ))}
      </NavList>
    </Root>
  );
};

export default MobileNav;
