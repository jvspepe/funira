import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { List, X } from "@phosphor-icons/react";
import { TCategory } from "../../@types/categories";
import IconButton from "../IconButton";
import * as Styled from "./styles";

type Props = {
  routes: TCategory[];
};

const MobileNav = ({ routes }: Props) => {
  const [active, setActive] = useState(false);
  const { colors } = useTheme();

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
    <Styled.Wrapper data-active={active}>
      <IconButton
        onClick={handleActive}
        aria-label={active ? "Fechar menu" : "Abrir menu"}
        aria-haspopup="true"
        aria-controls="navigation-list"
        aria-expanded={active}
        type="button"
      >
        {active ? (
          <X color={colors.text.primary} size={24} aria-hidden="true" />
        ) : (
          <List color={colors.text.primary} size={24} aria-hidden="true" />
        )}
      </IconButton>
      <Styled.NavList id="navigation-list" aria-hidden={!active}>
        <Styled.NavListItem key="Todos">
          <Styled.NavLink onClick={() => setActive(false)} to="/produtos">
            Todos
          </Styled.NavLink>
        </Styled.NavListItem>
        {routes.map((route) => (
          <Styled.NavListItem key={route.value}>
            <Styled.NavLink
              onClick={() => setActive(false)}
              to={`/produtos?tipo=${route.value}`}
            >
              {route.label}
            </Styled.NavLink>
          </Styled.NavListItem>
        ))}
      </Styled.NavList>
    </Styled.Wrapper>
  );
};

export default MobileNav;
