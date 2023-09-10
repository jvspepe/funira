/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import * as Styled from "./styles";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("email", {
            required: { value: true, message: "E-mail obrigatório" },
          })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="email"
          id="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
        />
        <TextInput
          {...register("password", {
            required: { value: true, message: "Senha obrigatória" },
          })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="password"
          id="password"
          name="password"
          placeholder="Senha123"
          label="Senha"
        />
        <Button type="submit">Entrar</Button>
        <Link to="/criar-conta">Não possui uma conta? Criar</Link>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default Login;
