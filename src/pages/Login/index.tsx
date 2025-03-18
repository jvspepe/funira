import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Heading,
  Icon,
  Input,
  Link,
  Separator,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { handleAuthError, loginUser } from '@/lib/auth';
import { PasswordInput } from '@/components/ui/password-input';
import GoogleIcon from '@/assets/GoogleIcon';

const formSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório'),
  persistUser: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  email: '',
  password: '',
  persistUser: false,
};

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async ({
    email,
    password,
    persistUser,
  }) => {
    try {
      await loginUser(email, password, persistUser);

      navigate('/');
    } catch (error) {
      form.setError('root', { message: handleAuthError(error) });
    }

    form.reset();
  };

  return (
    <Box
      flexGrow={1}
      display="grid"
      gridTemplateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
    >
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        backgroundSize="cover"
      ></Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          as="form"
          onSubmit={form.handleSubmit(onSubmit)}
          position="relative"
          display="flex"
          flexDirection="column"
          flexGrow="1"
          maxW="36rem"
          padding={{ base: '1.25rem', xl: '0' }}
          gap="1.25rem"
        >
          <Button
            asChild
            variant="subtle"
            width="fit-content"
          >
            <RouterLink to="/">
              <Icon>
                <ArrowLeft />
              </Icon>
              Voltar ao início
            </RouterLink>
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap="0.5rem"
          >
            <Heading size="md">Conecte em sua conta</Heading>
            <Box
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              <Text>Não possui uma conta?</Text>
              <Link asChild>
                <RouterLink to="/criar-conta">Crie uma conta</RouterLink>
              </Link>
            </Box>
          </Box>
          {form.formState.errors.root && (
            <Text textAlign="center">{form.formState.errors.root.message}</Text>
          )}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field.Root invalid={fieldState.error && true}>
                <Field.Label htmlFor={field.name}>E-mail</Field.Label>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="seu@email.com"
                />
                {fieldState.error && (
                  <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
                )}
              </Field.Root>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field.Root invalid={fieldState.error && true}>
                <Field.Label htmlFor={field.name}>Senha</Field.Label>
                <PasswordInput
                  {...field}
                  id={field.name}
                  placeholder="Sua senha"
                />
                {fieldState.error && (
                  <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
                )}
              </Field.Root>
            )}
          />
          <Controller
            name="persistUser"
            control={form.control}
            render={({ field }) => (
              <Checkbox.Root
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                checked={field.value}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Lembrar de mim?</Checkbox.Label>
              </Checkbox.Root>
            )}
          />
          <Button
            type="submit"
            loading={form.formState.isSubmitting}
            loadingText="Carregando..."
          >
            Confirmar
          </Button>
          <Box
            alignSelf="center"
            display="flex"
            flexDirection="column"
            gap="1.25rem"
            width="full"
          >
            <Box
              display="flex"
              alignItems="center"
              gap="1.25rem"
            >
              <Separator flexGrow="1" />
              <Text>Ou</Text>
              <Separator flexGrow="1" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="0.5rem"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="0.5rem"
              >
                <Button
                  type="button"
                  variant="outline"
                  width="full"
                >
                  <Icon>
                    <GoogleIcon />
                  </Icon>
                  <span>Continue com o Google</span>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
