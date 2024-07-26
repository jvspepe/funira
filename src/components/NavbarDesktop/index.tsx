import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { TCategory } from "@/@types/categories";
import Menu from "@/components/ui/Menu";
import * as S from "./styles";

type Props = {
  routes: TCategory[];
};

const Nav = ({ routes }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <S.Wrapper>
      <S.List>
        <li key="inicio">
          <S.Link to="/">Início</S.Link>
        </li>
        <li>
          <Menu
            isOpen={active}
            setIsOpen={setActive}
            toggle={
              <S.MenuToggle onClick={() => setActive(!active)} type="button">
                Produtos
                {active ? <CaretUp /> : <CaretDown />}
              </S.MenuToggle>
            }
          >
            <S.MenuDropdown>
              <li key="todos">
                <S.MenuDropdownItem
                  onClick={() => setActive(false)}
                  to="/produtos"
                >
                  Ver todos
                </S.MenuDropdownItem>
              </li>
              {routes.map((route) => (
                <li key={route.label}>
                  <S.MenuDropdownItem
                    onClick={() => setActive(false)}
                    to={`produtos?tipo=${route.value}`}
                  >
                    {route.label}
                  </S.MenuDropdownItem>
                </li>
              ))}
            </S.MenuDropdown>
          </Menu>
        </li>
        <li key="sobre">
          <S.Link to="/">Sobre</S.Link>
        </li>
      </S.List>
    </S.Wrapper>
  );
};

export default Nav;
