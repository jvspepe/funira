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
  Code,
  Flex,
  Heading,
  Icon,
  Link,
  Separator,
  Text,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from 'lucide-react';
import { paths } from '@/config/paths';
import { signIn } from '@/features/auth/services';
import { handleAuthError } from '@/features/utils';
import {
  type SignInSchema,
  signInDefaultValues,
  signInSchema,
} from './validation';
import { SignInWithGoogle } from '@/features/auth/components/sign-in-with-google';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '@/components/ui/password-input';
import { TextInput } from '@/components/ui/text-input';

export function SignInForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<SignInSchema>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = async ({
    email,
    password,
    rememberUser,
  }) => {
    try {
      await signIn(email, password, rememberUser);

      void navigate('/');
    } catch (error) {
      form.setError('root', { message: handleAuthError(error) });
    } finally {
      form.reset(signInDefaultValues);
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
        gap="{spacing.6}"
        padding={{ base: '{spacing.6}', xl: '0' }}
      >
        <Button
          asChild
          variant="subtle"
          width="fit-content"
        >
          <RouterLink to={paths.user.home}>
            <Icon>
              <ArrowLeftIcon />
            </Icon>
            Voltar ao início
          </RouterLink>
        </Button>
        <Flex
          justify="center"
          direction="column"
          gap="{spacing.2}"
        >
          <Heading size="md">Conecte em sua conta</Heading>
          <Box>
            <Text as="span">Não possui uma conta?</Text>{' '}
            <Link asChild>
              <RouterLink to={paths.user.signUp}>Crie uma conta</RouterLink>
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
