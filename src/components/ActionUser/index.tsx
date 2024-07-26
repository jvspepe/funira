import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useTheme } from "styled-components";
import { UserCircle } from "@phosphor-icons/react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/api/firebase/firebase-config";
import IconButton from "@/components/ui/IconButton";
import Menu from "@/components/ui/Menu";
import Button from "../ui/Button";

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
      {!userData ? (
        <>
          <Button
            component={Link}
            to="/conectar"
            variant="secondary"
            size="small"
          >
            Conectar
          </Button>
          <Button
            component={Link}
            to="/criar-conta"
            variant="secondary"
            size="small"
          >
            Criar conta
          </Button>
        </>
      ) : (
        <Button onClick={handleSignOut} variant="secondary" size="small">
          Sair
        </Button>
      )}
    </Menu>
  );
};

export default ActionUser;
