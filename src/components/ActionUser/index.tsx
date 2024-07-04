import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useTheme } from "styled-components";
import { UserCircle } from "@phosphor-icons/react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/api/firebase/firebase-config";
import IconButton from "@/components/IconButton";
import Menu from "@/components/Menu";
import * as S from "./styles";

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
      <S.Wrapper>
        {!userData ? (
          <>
            <S.Button component={Link} to="/conectar">
              Conectar
            </S.Button>
            <S.Button component={Link} to="/criar-conta">
              Criar conta
            </S.Button>
          </>
        ) : (
          <S.Button onClick={handleSignOut}>Sair</S.Button>
        )}
      </S.Wrapper>
    </Menu>
  );
};

export default ActionUser;
