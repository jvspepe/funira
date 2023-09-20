import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { UserCircle } from "@phosphor-icons/react";
import Menu from "../Menu";
import IconButton from "../IconButton";
import Wrapper from "./styles";
import Button from "../Button";

const ActionUser = () => {
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
        <Button component={Link} to="/conectar" variant="tertiary" size="small">
          Conectar
        </Button>
        <hr />
        <Button
          component={Link}
          to="/criar-conta"
          variant="tertiary"
          size="small"
        >
          Criar conta
        </Button>
      </Wrapper>
    </Menu>
  );
};

export default ActionUser;
