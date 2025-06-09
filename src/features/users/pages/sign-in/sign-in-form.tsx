import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
  type SubmitHandler,
  Controller,
  DefaultValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Icon,
  Input,
  Link,
  Separator,
  Text,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from 'lucide-react';
import { paths } from '@/config/paths';
import { signIn } from '@/features/users/services';
import { handleAuthError } from '@/features/utils';
import { type SignInSchema, signInSchema } from './sign-in-validation';
import { GoogleAuth } from '@/features/users/components/google-auth';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '@/components/ui/password-input';
import { Field } from '@/components/ui/field';

const signInDefaultValues: DefaultValues<SignInSchema> = {
  email: '',
  password: '',
  rememberUser: false,
};

export function SignInForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<SignInSchema>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const { t } = useTranslation();

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
            <Icon aria-hidden>
              <ArrowLeftIcon />
            </Icon>
            {t('common:buttons.back')}
          </RouterLink>
        </Button>
        <Flex
          justify="center"
          direction="column"
          gap="{spacing.2}"
        >
          <Heading size="md">{t('auth.sign-in.heading')}</Heading>
          <Box>
            <Text as="span">{t('auth.sign-in.prompt')}</Text>{' '}
            <Link asChild>
              <RouterLink to={paths.user.signUp}>
                {t('auth.sign-up.heading')}
              </RouterLink>
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
            <Field
              label={t('common:inputs.email')}
              invalid={fieldState.error ? true : undefined}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
            >
              <Input
                {...field}
                type="email"
                placeholder={t('common:inputs.emailPlaceholder')}
              />
            </Field>
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
              label={t('common:inputs.password')}
              placeholder={t('common:inputs.passwordPlaceholder')}
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
              {t('common:inputs.rememberUser')}
            </Checkbox>
          )}
        />
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          loadingText={t('buttons.loading')}
        >
          {t('common:buttons.confirm')}
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
            <Text>{t('common:or')}</Text>
            <Separator flexGrow="1" />
          </Flex>
          <GoogleAuth
            loading={googleLoading}
            setLoading={setGoogleLoading}
          />
        </Flex>
      </Flex>
    </FormProvider>
  );
}
