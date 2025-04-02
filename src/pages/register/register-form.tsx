import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { z } from 'zod';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Separator,
  Heading,
  Icon,
  Link,
  Text,
  Code,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { createUser, handleAuthError } from '@/lib/auth';
import PasswordInput from '@/components/ui/password-input';
import GoogleLogin from '@/components/google-login';
import TextInput from '@/components/ui/text-input';

const formSchema = z
  .object({
    firstName: z.string().nonempty('Campo obrigatório'),
    lastName: z.string().nonempty('Campo obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    confirmPassword: z.string().nonempty('Campo obrigatório'),
    persistUser: z.boolean(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais',
        path: ['password', 'confirmPassword'],
      });
    }
  });

export type RegisterFormSchema = z.infer<typeof formSchema>;

const defaultValues: RegisterFormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  persistUser: false,
};

const RegisterForm = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<RegisterFormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = async ({
    firstName,
    lastName,
    email,
    password,
    persistUser,
  }) => {
    try {
      await createUser(
        firstName.concat(' ', lastName),
        email,
        password,
        persistUser
      );

      void navigate('/');
    } catch (error) {
      form.setError('root', { message: handleAuthError(error) });
    } finally {
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
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
          <Heading size="lg">Crie sua conta</Heading>

          <Box
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <Text>Já possui uma conta?</Text>
            <Link asChild>
              <RouterLink to="/conectar">Conectar</RouterLink>
            </Link>
          </Box>
        </Box>
        {form.formState.errors.root && (
          <Code
            variant="surface"
            colorPalette="red"
            width="fit-content"
            alignSelf="center"
          >
            {form.formState.errors.root.message}
          </Code>
        )}
        <Box
          display="flex"
          gap="1rem"
        >
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome"
                error={fieldState.error && true}
                errorText={
                  fieldState.error ? fieldState.error.message : undefined
                }
                placeholder="Seu nome"
              />
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Sobrenome"
                error={fieldState.error && true}
                errorText={
                  fieldState.error ? fieldState.error.message : undefined
                }
                placeholder="Seu sobrenome"
              />
            )}
          />
        </Box>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              type="email"
              label="E-mail"
              error={fieldState.error && true}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
              placeholder="seu@email"
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              id={field.name}
              visible={showPassword}
              onVisibleChange={setShowPassword}
              error={fieldState.error && true}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
              label="Senha"
              placeholder="Mínimo de 6 caractéres"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              type={showPassword ? 'text' : 'password'}
              label="Confirmar senha"
              error={fieldState.error && true}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
              placeholder="Mínimo de 6 caractéres"
            />
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
          disabled={googleLoading}
          display="flex"
          alignItems="center"
          gap="0.5rem"
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
          <GoogleLogin
            loading={googleLoading}
            setLoading={setGoogleLoading}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default RegisterForm;
