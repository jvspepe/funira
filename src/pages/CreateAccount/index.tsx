import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser, handleAuthError } from '@/lib/auth';
import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import TextInput from '@/components/ui/TextInput';
import Typography from '@/components/ui/Typography';

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit: SubmitHandler<FormSchema> = async ({
    username,
    email,
    password,
  }) => {
    setLoading(true);

    try {
      await createUser(username, email, password);

      navigate('/');
    } catch (error) {
      setError(handleAuthError(error));
    }

    setLoading(false);

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
        width={['20rem', '30rem']}
        backgroundColor="background.primary"
      >
        {error && <Typography textAlign="center">{error}</Typography>}
        <TextInput
          {...register('username', {
            required: { value: true, message: 'Nome de Usuário obrigatório' },
          })}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          type="text"
          id="username"
          name="username"
          placeholder="Nome de Usuário"
          label="Nome de Usuário"
        />
        <TextInput
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="email"
          id="email"
          name="email"
          placeholder="seu@email.com"
          label="E-mail"
        />
        <TextInput
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          label="Senha"
        />
        <TextInput
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          label="Confirmar Senha"
        />
        <Button type="submit">{loading ? <Spinner /> : 'Criar'}</Button>
        <Typography component="span">
          Já possui uma conta?{' '}
          <Typography
            component={Link}
            to="/conectar"
          >
            Conectar
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateAccount;
