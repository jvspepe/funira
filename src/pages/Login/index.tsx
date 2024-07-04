import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/firebase/firebase-config";
import getAuthError from "@/api/firebase/authentication/auth-errors";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import TextInput from "@/components/TextInput";
import Typography from "@/components/Typography";

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

  const navigate = useNavigate();

  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
        <Button type="submit">{authLoading ? <Spinner /> : "Conectar"}</Button>
        <Typography component="span">
          Não possui uma conta?{" "}
          <Typography component={Link} to="/criar-conta">
            Criar
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
