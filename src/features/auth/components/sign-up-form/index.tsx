import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
  type SubmitHandler,
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
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
  Input,
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
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

export function SignUpForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<SignUpSchema>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const { t } = useTranslation();

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
            {t('common:buttons.back')}
          </RouterLink>
        </Button>
        <Flex
          justify="center"
          direction="column"
          gap="{spacing.2}"
        >
          <Heading size="2xl">{t('auth.sign-up.heading')}</Heading>
          <Box>
            <Text
              as="span"
              color="fg.muted"
            >
              {t('auth.sign-up.prompt')}
            </Text>{' '}
            <Link
              asChild
              color="fg.muted"
            >
              <RouterLink to={paths.user.signIn}>
                {t('auth.sign-in.heading')}
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
        <Flex gap="{spacing.6}">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                label={t('common:inputs.firstName')}
                invalid={!!fieldState.error}
                errorText={
                  fieldState.error ? fieldState.error.message : undefined
                }
              >
                <Input
                  {...field}
                  type="text"
                  placeholder={t('common:inputs.firstNamePlaceholder')}
                />
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                label={t('common:inputs.lastName')}
                invalid={!!fieldState.error}
                errorText={
                  fieldState.error ? fieldState.error.message : undefined
                }
              >
                <Input
                  {...field}
                  type="text"
                  placeholder={t('common:inputs.lastNamePlaceholder')}
                />
              </Field>
            )}
          />
        </Flex>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label={t('common:inputs.email')}
              invalid={!!fieldState.error}
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
            <Field
              label={t('common:inputs.password')}
              invalid={!!fieldState.error}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
            >
              <PasswordInput
                {...field}
                id={field.name}
                visible={showPassword}
                onVisibleChange={setShowPassword}
                placeholder={t('common:inputs.passwordPlaceholder')}
              />
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label={t('common:inputs.confirmPassword')}
              invalid={!!fieldState.error}
              errorText={
                fieldState.error ? fieldState.error.message : undefined
              }
            >
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('common:inputs.passwordPlaceholder')}
              />
            </Field>
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
          disabled={googleLoading}
          display="flex"
          alignItems="center"
          gap="{spacing.2}"
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
          <SignInWithGoogle
            loading={googleLoading}
            setLoading={setGoogleLoading}
          />
        </Flex>
      </Flex>
    </FormProvider>
  );
}
