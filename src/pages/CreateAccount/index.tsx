import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft, EyeClosed, EyeIcon } from 'lucide-react';
import { createUser, handleAuthError } from '@/lib/auth';
import GoogleIcon from '@/assets/GoogleIcon';

const formSchema = z
  .object({
    firstName: z.string().nonempty('Campo obrigatório'),
    lastName: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    email: z.string().nonempty('Campo obrigatório'),
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

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  persistUser: false,
};

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async ({
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
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            width="fit-content"
          >
            <Icon as={ArrowLeft} />
            Voltar ao início
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
              <Link
                as={RouterLink}
                to="/conectar"
              >
                Conectar
              </Link>
            </Box>
          </Box>
          {form.formState.errors.root && (
            <Text textAlign="center">{form.formState.errors.root.message}</Text>
          )}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.error && true}>
                  <FormLabel htmlFor={field.name}>Nome</FormLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="Fulano"
                  />
                  {fieldState.error && (
                    <FormErrorMessage>
                      {fieldState.error.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.error && true}>
                  <FormLabel htmlFor={field.name}>Sobrenome</FormLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="de Tal"
                  />
                  {fieldState.error && (
                    <FormErrorMessage>
                      {fieldState.error.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.error && true}>
                <FormLabel htmlFor={field.name}>E-mail</FormLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="fulano@email.com"
                />
                {fieldState.error && (
                  <FormErrorMessage>
                    {fieldState.error.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.error && true}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor={field.name}>Senha</FormLabel>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Esconder senhas' : 'Mostrar senhas'
                    }
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <Icon as={EyeClosed} />
                    ) : (
                      <Icon as={EyeIcon} />
                    )}
                  </IconButton>
                </Box>
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo de 6 caractéres"
                />
                {fieldState.error && (
                  <FormErrorMessage>
                    {fieldState.error.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.error && true}>
                <FormLabel htmlFor={field.name}>Confirmar Senha</FormLabel>
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo de 6 caractéres"
                />
                {fieldState.error && (
                  <FormErrorMessage>
                    {fieldState.error.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="persistUser"
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
            disabled={form.formState.isSubmitting}
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner />
                <span>Carregando...</span>
              </>
            ) : (
              'Confirmar'
            )}
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
              <Divider />
              <Text>Ou</Text>
              <Divider />
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
                  display="flex"
                  alignItems="center"
                  w="full"
                  gap="0.5rem"
                >
                  <Icon
                    as={GoogleIcon}
                    height="1.5rem"
                    width="1.5rem"
                  />
                  <span>Continue com o Google</span>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      ></Box>
    </Box>
  );
};

export default CreateAccount;
