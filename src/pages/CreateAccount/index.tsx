import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, firestore } from "../../api/firebase/firebase-config";
import createUser from "../../api/firebase/authentication/create-new-user";
import getAuthError from "../../api/firebase/authentication/auth-errors";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import TextInput from "../../components/TextInput";
import Typography from "../../components/Typography";

type CreateAccountValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateAccount = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAccountValues>();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CreateAccountValues> = async (data) => {
    setAuthLoading(true);
    try {
      await createUser(auth, firestore, data);
      navigate("/");
    } catch (error) {
      setAuthError(getAuthError(error));
    }
    setAuthLoading(false);
    reset();
  };

  return (
    <Box
      alignItems="center"
      backgroundColor="background.secondary"
      backgroundImage="url(/images/auth-bg.jpg)"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      display="flex"
      height="calc(100vh - 5rem)"
      p="1.5rem"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        p="1rem"
        gridGap="1rem"
        marginX="auto"
        width={["20rem", "30rem"]}
        backgroundColor="background.primary"
      >
        {authError && <Typography textAlign="center">{authError}</Typography>}
        <TextInput
          {...register("displayName", {
            required: { value: true, message: "Nome de Usuário obrigatório" },
          })}
          error={!!errors.displayName}
          helperText={errors.displayName && errors.displayName.message}
          type="text"
          id="displayName"
          name="displayName"
          placeholder="Nome de Usuário"
          label="Nome de Usuário"
        />
        <TextInput
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="email"
          id="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
        />
        <TextInput
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          label="Senha"
        />
        <TextInput
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          label="Confirmar Senha"
        />
        <Button type="submit">{authLoading ? <Spinner /> : "Criar"}</Button>
        <Typography component="span">
          Já possui uma conta?{" "}
          <Typography component={Link} to="/conectar">
            Conectar
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateAccount;
