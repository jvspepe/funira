import { Link as RouterLink } from 'react-router';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  List,
  Link,
  Separator,
  Group,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import useGetCategories from '@/hooks/useGetCategories';
import Copyright from '@/components/copyright';

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
    <Box backgroundColor="purple.900">
      <Container>
        <Box
          as="footer"
          display="grid"
          gap="{spacing.6}"
          paddingBlock="{spacing.6}"
        >
          <Box
            display="flex"
            flexDirection={{ base: 'column', lg: 'row' }}
            gap="{spacing.12}"
          >
            <Box
              display="flex"
              flexWrap="wrap"
              gap="{spacing.12}"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="{spacing.2}"
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
                  gap="{spacing.2}"
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
                      <Link asChild>
                        <RouterLink to={`/produtos?tipo=${item.value}`}>
                          {item.label}
                        </RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="{spacing.2}"
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
                  gap="{spacing.2}"
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
                      <Link asChild>
                        <RouterLink to={`/produtos?ordem=${route.value}`}>
                          {route.label}
                        </RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="{spacing.2}"
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
                  gap="{spacing.2}"
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
                      <Link asChild>
                        <RouterLink to="/">{route}</RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            </Box>
            <Group
              as="form"
              onSubmit={form.handleSubmit(onSubmit)}
              flexGrow="1"
              height="fit-content"
              attached
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field.Root invalid={fieldState.error && true}>
                    <Heading asChild>
                      <Field.Label
                        htmlFor="newsletter-email"
                        color="white"
                        fontSize="md"
                      >
                        Inscreva-se na nossa lista de e-mails
                      </Field.Label>
                    </Heading>
                    <Input
                      {...field}
                      id="newsletter-email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      variant="subtle"
                      borderRightRadius="0"
                    />
                    {fieldState.error && (
                      <Field.ErrorText>
                        {fieldState.error.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                )}
              />
              <Button
                type="submit"
                alignSelf={'end'}
              >
                Confirmar
              </Button>
            </Group>
          </Box>
          <Separator />
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
