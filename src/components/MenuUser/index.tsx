import { useState } from "react";
import { useTheme } from "styled-components";
import { UserCircle } from "@phosphor-icons/react";
import Menu from "../Menu";
import IconButton from "../IconButton";
import Wrapper from "./styles";
import Link from "../Link";

const MenuUser = () => {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  return (
    <Menu
      isOpen={open}
      setIsOpen={setOpen}
      position="right"
      toggle={
        <IconButton onClick={() => setOpen(!open)}>
          <UserCircle color={colors.text.primary} size={24} />
        </IconButton>
      }
    >
      <Wrapper>
        <Link to="/conectar">Entrar</Link>
        <Link to="/criar-conta">Criar Conta</Link>
      </Wrapper>
    </Menu>
  );
};

export default MenuUser;
