import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  List,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import useGetCategories from '@/hooks/useGetCategories';
import Copyright from '@/components/Copyright';

const productRoutes = [
  { label: 'Maior Preço', value: 'maior-preço' },
  { label: 'Menor Preço', value: 'menor-preço' },
  { label: 'Novos', value: 'novo' },
  { label: 'Mais Vendidos', value: 'mais-vendidos' },
  { label: 'Melhor Avaliados', value: 'melhor-avaliados' },
];
const companyRoutes = ['Sobre', 'Contato', 'Carreiras'];

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  email: '',
};

const Footer = () => {
  const { categories } = useGetCategories();

  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = ({ email }) => {
    toaster.create({
      title: `E-mail ${email} cadastrado com sucesso`,
      description: 'Seu e-mail irá receber novidades de nossa empresa',
      type: 'info',
    });

    form.reset(defaultValues);
  };

  return (
    <Box backgroundColor="purple.800">
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        }}
        p={0}
      >
        <Box
          as="footer"
          display="grid"
          gap="1.25rem"
          paddingBlock="2.5rem 1.5rem"
          paddingInline={{ base: '1.5rem', sm: '0' }}
        >
          <Box
            display="flex"
            flexDirection={{ base: 'column', lg: 'row' }}
            gap="3rem"
            borderBottom="1px solid white"
            paddingBottom="1rem"
          >
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
              <Box
                display="flex"
                flexDirection="column"
                gap="0.75rem"
              >
                <Heading
                  color="white"
                  fontSize="md"
                >
                  Categorias
                </Heading>
                <List.Root
                  as="ul"
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  listStyle="none"
                  margin="0"
                >
                  {categories.map((item) => (
                    <List.Item
                      key={item.uid}
                      asChild
                      color="white"
                      fontSize="0.875rem"
                    >
                      <Link to={`/produtos?tipo=${item.value}`}>
                        {item.label}
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="0.75rem"
              >
                <Heading
                  color="white"
                  fontSize="md"
                >
                  Menu
                </Heading>
                <List.Root
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  listStyle="none"
                  margin="0"
                >
                  {productRoutes.map((route) => (
                    <List.Item
                      key={route.value}
                      asChild
                      color="white"
                      fontSize="0.875rem"
                    >
                      <Link to={`/produtos?ordem=${route.value}`}>
                        {route.label}
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="0.75rem"
              >
                <Heading
                  color="white"
                  fontSize="md"
                >
                  Nossa Empresa
                </Heading>
                <List.Root
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  listStyle="none"
                  margin="0"
                >
                  {companyRoutes.map((route) => (
                    <List.Item
                      key={route}
                      asChild
                      color="white"
                      fontSize="0.875rem"
                    >
                      <Link to="/">{route}</Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            </Box>
            <Box
              as="form"
              onSubmit={form.handleSubmit(onSubmit)}
              display="flex"
              flexDirection="column"
              gap="0.5rem"
              flexGrow="1"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="0.5rem"
                  >
                    <Field.Root invalid={fieldState.error && true}>
                      <Field.Label
                        htmlFor="newsletter-email"
                        color="white"
                        fontWeight="bold"
                      >
                        Inscreva-se na nossa lista de e-mails
                      </Field.Label>
                      <Input
                        {...field}
                        id="newsletter-email"
                        type="email"
                        placeholder="Digite seu e-mail"
                      />
                      {fieldState.error && (
                        <Field.ErrorText>
                          {fieldState.error.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Button type="submit">Confirmar</Button>
                  </Box>
                )}
              />
            </Box>
          </Box>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
