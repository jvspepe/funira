import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useTheme } from "styled-components";
import { UserCircle } from "@phosphor-icons/react";
import { auth } from "../../api/firebase/firebase-config";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";
import IconButton from "../IconButton";
import Menu from "../Menu";
import Wrapper from "./styles";

const ActionUser = () => {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      throw new Error(String(error));
    }
  };

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
        {!userData ? (
          <>
            <Button
              component={Link}
              to="/conectar"
              variant="tertiary"
              size="small"
            >
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
          </>
        ) : (
          <Button onClick={handleSignOut} variant="tertiary" size="small">
            Sair
          </Button>
        )}
      </Wrapper>
    </Menu>
  );
};

export default ActionUser;
