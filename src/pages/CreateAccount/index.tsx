/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, firestore } from "../../api/firebase/firebase-config";
import createUser from "../../api/firebase/authentication/create-new-user";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import * as Styled from "./styles";
import Typography from "../../components/Typography";
import { Link } from "react-router-dom";

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

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CreateAccountValues> = async (data) => {
    setLoading(true);
    try {
      await createUser(auth, firestore, data);
    } catch (error) {
      throw new Error(String(error));
    }
    setLoading(false);
    reset();
  };

  return (
    <Styled.Background>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
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
          variant="primary"
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
          variant="primary"
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
          variant="primary"
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
          variant="primary"
        />
        <Button variant="primary" type="submit">
          {loading ? <Styled.Spinner /> : "Criar"}
        </Button>
        <Typography component={Link} to="/conectar">
          Já possui uma conta? Conectar
        </Typography>
      </Styled.Form>
    </Styled.Background>
  );
};

export default CreateAccount;
