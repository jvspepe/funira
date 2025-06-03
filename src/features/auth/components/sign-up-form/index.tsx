import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
  type SubmitHandler,
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Separator,
  Heading,
  Icon,
  Link,
  Text,
  Code,
  Flex,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { paths } from '@/config/paths';
import { signUp } from '@/features/auth/services';
import { handleAuthError } from '@/features/utils';
import {
  type SignUpSchema,
  signUpDefaultValues,
  signUpSchema,
} from './validation';
import { SignInWithGoogle } from '@/features/auth/components/sign-in-with-google';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '@/components/ui/password-input';
import { TextInput } from '@/components/ui/text-input';

export function SignUpForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<SignUpSchema>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({
    firstName,
    lastName,
    email,
    password,
    rememberUser,
  }) => {
    try {
      await signUp(
        firstName.concat(' ', lastName),
        email,
        password,
        rememberUser
      );

      void navigate('/');
    } catch (error) {
      form.setError('root', { message: handleAuthError(error) });
    } finally {
      form.reset(signUpDefaultValues);
    }
  };

  return (
    <FormProvider {...form}>
      <Flex
        as="form"
        onSubmit={form.handleSubmit(onSubmit)}
        position="relative"
        maxWidth="{sizes.xl}"
        direction="column"
        grow="1"
        padding={{ base: '{spacing.6}', xl: '0' }}
        gap="{spacing.6}"
      >
        <Button
          asChild
          variant="subtle"
          width="fit-content"
        >
          <RouterLink to={paths.user.home}>
            <Icon aria-hidden>
              <ArrowLeft />
            </Icon>
            Voltar ao início
          </RouterLink>
        </Button>
        <Flex
          justify="center"
          direction="column"
          gap="{spacing.2}"
        >
          <Heading size="2xl">Crie sua conta</Heading>
          <Box>
            <Text
              as="span"
              color="fg.muted"
            >
              Já possui uma conta?
            </Text>{' '}
            <Link
              asChild
              color="fg.muted"
              _hover={{ color: 'blue.500' }}
            >
              <RouterLink to={paths.user.signIn}>Conectar</RouterLink>
            </Link>
          </Box>
        </Flex>
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
        <Flex gap="{spacing.6}">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome"
                error={fieldState.error ? true : undefined}
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
                error={fieldState.error ? true : undefined}
                errorText={
                  fieldState.error ? fieldState.error.message : undefined
                }
                placeholder="Seu sobrenome"
              />
            )}
          />
        </Flex>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              type="email"
              label="E-mail"
              error={fieldState.error ? true : undefined}
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
              error={fieldState.error ? true : undefined}
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
              error={fieldState.error ? true : undefined}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
              placeholder="Mínimo de 6 caractéres"
            />
          )}
        />
        <Controller
          name="rememberUser"
          control={form.control}
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              checked={field.value}
            >
              Lembrar de mim?
            </Checkbox>
          )}
        />
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          loadingText="Carregando..."
          disabled={googleLoading}
          display="flex"
          alignItems="center"
          gap="{spacing.2}"
        >
          Confirmar
        </Button>
        <Flex
          width="full"
          direction="column"
          gap="{spacing.6}"
          alignSelf="center"
        >
          <Flex
            align="center"
            gap="{spacing.6}"
          >
            <Separator flexGrow="1" />
            <Text>Ou</Text>
            <Separator flexGrow="1" />
          </Flex>
          <SignInWithGoogle
            loading={googleLoading}
            setLoading={setGoogleLoading}
          />
        </Flex>
      </Flex>
    </FormProvider>
  );
}
