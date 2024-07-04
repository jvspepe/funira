import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { TCategory } from "@/@types/categories";
import Typography from "@/components/Typography";
import Menu from "@/components/Menu";
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
          <Typography component={Link} to="/">
            Início
          </Typography>
        </li>
        <li>
          <Menu
            isOpen={active}
            setIsOpen={setActive}
            toggle={
              <S.MenuToggle
                onClick={() => setActive(!active)}
                component="button"
                type="button"
              >
                Produtos
                <CaretDown />
              </S.MenuToggle>
            }
          >
            <S.MenuDropdown>
              <li key="todos">
                <S.MenuDropdownItem
                  component={Link}
                  onClick={() => setActive(false)}
                  to="/produtos"
                >
                  Ver todos
                </S.MenuDropdownItem>
              </li>
              {routes.map((route) => (
                <li key={route.label}>
                  <S.MenuDropdownItem
                    component={Link}
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
          <Typography component={Link} to="/sobre">
            Sobre
          </Typography>
        </li>
      </S.List>
    </S.Wrapper>
  );
};

export default Nav;
