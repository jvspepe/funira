import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleAuthError, loginUser } from '@/lib/auth';
import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import TextInput from '@/components/ui/TextInput';
import Typography from '@/components/ui/Typography';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  email: '',
  password: '',
};

const Login = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormSchema> = async ({ email, password }) => {
    setLoading(true);

    try {
      await loginUser(email, password);

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
          {...register('email', {
            required: { value: true, message: 'E-mail obrigatório' },
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
          {...register('password', {
            required: { value: true, message: 'Senha obrigatória' },
          })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="password"
          id="password"
          name="password"
          placeholder="Senha123"
          label="Senha"
        />
        <Button type="submit">{loading ? <Spinner /> : 'Conectar'}</Button>
        <Typography component="span">
          Não possui uma conta?{' '}
          <Typography
            component={Link}
            to="/criar-conta"
          >
            Criar
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
