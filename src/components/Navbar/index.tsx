import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { CaretDown, CaretUp, List, X } from "@phosphor-icons/react";
import { TCategory } from "@/@types/categories";
import IconButton from "@/components/ui/IconButton";
import * as S from "./styles";

type Props = {
  routes: TCategory[];
};

const MobileNav = ({ routes }: Props) => {
  const [active, setActive] = useState(false);
  const [accordionActive, setAccordionActive] = useState(false);
  const { colors } = useTheme();
  const accordionRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    if (!accordionRef.current) return;
    if (accordionActive) {
      accordionRef.current.style.maxHeight =
        accordionRef.current.scrollHeight + "px";
    } else {
      accordionRef.current.style.maxHeight = "0";
    }
  }, [accordionActive]);

  return (
    <S.Wrapper data-active={active}>
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
      <S.NavList id="navigation-list" aria-hidden={!active}>
        <S.NavListItem key="inicio">
          <S.NavLink component={Link} onClick={() => setActive(false)} to="/">
            Início
          </S.NavLink>
        </S.NavListItem>
        <S.Accordion>
          <S.AccordionButton
            onClick={() => setAccordionActive(!accordionActive)}
            type="button"
          >
            Produtos
            {accordionActive ? <CaretUp /> : <CaretDown />}
          </S.AccordionButton>
          <S.AccordionContent ref={accordionRef} data-active={accordionActive}>
            {routes.map((route) => (
              <li key={route.uid}>
                <S.NavLink
                  component={Link}
                  onClick={() => {
                    setAccordionActive(false);
                    setActive(false);
                  }}
                  to={`/produtos?tipo=${route.value}`}
                >
                  {route.label}
                </S.NavLink>
              </li>
            ))}
          </S.AccordionContent>
        </S.Accordion>
        <S.NavListItem key="sobre">
          <S.NavLink component={Link} onClick={() => setActive(false)} to="/">
            Sobre
          </S.NavLink>
        </S.NavListItem>
      </S.NavList>
    </S.Wrapper>
  );
};

export default MobileNav;
