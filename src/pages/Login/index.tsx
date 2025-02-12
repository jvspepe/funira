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
import { handleAuthError, loginUser } from '@/lib/auth';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <>
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
          padding={{ base: '1.25rem', lg: '0' }}
          gap="1.25rem"
        >
          <Button
            as={RouterLink}
            to="/"
            position={{ md: 'absolute' }}
            bottom={{ md: 'calc(100% + 1.25rem)' }}
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
            <Heading size="lg">Conecte em sua conta</Heading>
            <Box
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              <Text>Não possui uma conta?</Text>
              <Link
                as={RouterLink}
                to="/criar-conta"
              >
                Crie uma conta
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
                      showPassword ? 'Esconder senha' : 'Mostrar Senha'
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
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="1.25rem"
                    width="1.25rem"
                  >
                    <path
                      fill="#4285f4"
                      d="M23.5151 12.2611c0 -0.9661 -0.0784 -1.6711 -0.24805 -2.4022H12.2351v4.3605h6.4755c-0.1305 1.08365 -0.8355 2.7156 -2.4022 3.8122l-0.02195 0.146 3.4881 2.702175 0.24165 0.024125c2.2194 -2.04975 3.4989 -5.0656 3.4989 -8.6428Z"
                      strokeWidth="0.25"
                    ></path>
                    <path
                      fill="#34a853"
                      d="M12.234975 23.75c3.17245 0 5.83575 -1.0445 7.7811 -2.8461L16.308275 18.031625c-0.9922 0.69195 -2.3239 1.175 -4.0733 1.175 -3.1072 0 -5.7444 -2.049675 -6.6845 -4.882725l-0.137775 0.0117L1.7857125 17.14255l-0.0474325 0.13185C3.670475 21.112725 7.639375 23.75 12.234975 23.75Z"
                      strokeWidth="0.25"
                    ></path>
                    <path
                      fill="#fbbc05"
                      d="M5.550625 14.3239c-0.248075 -0.7311 -0.391625 -1.5145 -0.391625 -2.3239 0 -0.8095 0.143575 -1.5928 0.378575 -2.3239l-0.006575 -0.1557L1.858565 6.66835l-0.120155 0.05715C0.9420575 8.3183 0.4851075 10.10695 0.4851075 12c0 1.89305 0.45695 3.6816 1.2533025 5.2744l3.812215 -2.9505Z"
                      strokeWidth="0.25"
                    ></path>
                    <path
                      fill="#eb4335"
                      d="M12.234975 4.7933c2.20635 0 3.69465 0.95305 4.5433 1.7495L20.094375 3.305C18.057775 1.41195 15.407425 0.25 12.234975 0.25 7.639375 0.25 3.670475 2.8872 1.73828 6.7255L5.537425 9.6761c0.95315 -2.83305 3.59035 -4.8828 6.69755 -4.8828Z"
                      strokeWidth="0.25"
                    ></path>
                  </Icon>
                  <span>Continue com o Google</span>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
