import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { z } from 'zod';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Code,
  Heading,
  Icon,
  Link,
  Separator,
  Text,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from 'lucide-react';
import { handleAuthError, loginUser } from '@/lib/auth';
import PasswordInput from '@/components/ui/password-input';
import TextInput from '@/components/ui/text-input';
import GoogleLogin from '@/components/google-login';

const formSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório'),
  persistUser: z.boolean(),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

const defaultValues: LoginFormSchema = {
  email: '',
  password: '',
  persistUser: false,
};

const LoginForm = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<LoginFormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async ({
    email,
    password,
    persistUser,
  }) => {
    try {
      await loginUser(email, password, persistUser);

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
              <ArrowLeftIcon />
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
          <Code
            variant="surface"
            colorPalette="red"
            width="fit-content"
            alignSelf="center"
          >
            {form.formState.errors.root.message}
          </Code>
        )}
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
          <GoogleLogin
            loading={googleLoading}
            setLoading={setGoogleLoading}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
