import { Link as RouterLink, useNavigate } from 'react-router';
import {
  type SubmitHandler,
  type DefaultValues,
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Code, Heading, Icon, Text } from '@chakra-ui/react';
import { ArrowLeftIcon } from 'lucide-react';
import { type SignInSchema, signInSchema } from './validation';
import { signIn } from '@/features/auth/services';
import { handleAuthError } from '@/features/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '@/components/ui/password-input';
import { TextInput } from '@/components/ui/text-input';

const defaultValues: DefaultValues<SignInSchema> = {
  email: '',
  password: '',
  rememberUser: false,
};

export function AdminSignInForm() {
  const navigate = useNavigate();

  const form = useForm<SignInSchema>({
    defaultValues,
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = async ({
    email,
    password,
    rememberUser,
  }) => {
    try {
      await signIn(email, password, rememberUser);

      void navigate('/admin');
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
        maxWidth="{sizes.xl}"
        padding={{ base: '{spacing.6}', xl: '0' }}
        gap="{spacing.6}"
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
            Voltar a página inicial
          </RouterLink>
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          gap="{spacing.2}"
        >
          <Heading>Painel de Administração Funira</Heading>
          <Text as="span">
            Não possui acesso? Verifique com um de seus gerenciadores
          </Text>
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
      </Box>
    </FormProvider>
  );
}
