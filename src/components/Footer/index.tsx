import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ListItem,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';
import useGetCategories from '@/hooks/useGetCategories';
import Button from '@/components/ui/Button';
import Copyright from '@/components/Copyright';
import TextInput from '@/components/ui/TextInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const productRoutes = [
  { label: 'Maior Preço', value: 'maior-preço' },
  { label: 'Menor Preço', value: 'menor-preço' },
  { label: 'Novos', value: 'novo' },
  { label: 'Mais Vendidos', value: 'mais-vendidos' },
  { label: 'Melhor Avaliados', value: 'melhor-avaliados' },
];
const companyRoutes = ['Sobre', 'Contato', 'Carreiras'];

const formSchema = z.object({
  email: z.string().email().nonempty(),
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
  const { colors } = useTheme();

  const onSubmit: SubmitHandler<FormSchema> = ({ email }) => {
    console.log(email);

    form.reset(defaultValues);
  };

  return (
    <div style={{ backgroundColor: colors.background.tertiary }}>
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1440px',
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
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
                <UnorderedList
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  styleType="none"
                  margin="0"
                >
                  {categories.map((item) => (
                    <ListItem
                      key={item.uid}
                      as={Link}
                      to={`/produtos?tipo=${item.value}`}
                      color="white"
                      fontSize="0.875rem"
                    >
                      {item.label}
                    </ListItem>
                  ))}
                </UnorderedList>
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
                <UnorderedList
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  styleType="none"
                  margin="0"
                >
                  {productRoutes.map((route) => (
                    <ListItem
                      key={route.value}
                      as={Link}
                      to={`/produtos?ordem=${route.value}`}
                      color="white"
                      fontSize="0.875rem"
                    >
                      {route.label}
                    </ListItem>
                  ))}
                </UnorderedList>
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
                <UnorderedList
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                  styleType="none"
                  margin="0"
                >
                  {companyRoutes.map((route) => (
                    <ListItem
                      key={route}
                      as={Link}
                      to="/"
                      color="white"
                      fontSize="0.875rem"
                    >
                      {route}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </div>
            <Box
              as="form"
              onSubmit={form.handleSubmit(onSubmit)}
              backgroundColor="white"
              display="flex"
              gap="0.5rem"
              padding="0.5rem"
              borderRadius="base"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormControl isInvalid={fieldState.error && true}>
                    <VisuallyHidden>
                      <FormLabel htmlFor={field.name}>Seu e-mail</FormLabel>
                    </VisuallyHidden>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="Digite seu e-mail"
                    />
                    {fieldState.error && (
                      <FormErrorMessage>
                        {fieldState.error.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Button type="submit">Confirmar</Button>
            </Box>
            <form
              onSubmit={(event: FormEvent) => event.preventDefault()}
              style={{ flexGrow: 1 }}
            >
              <TextInput
                label="Inscreva-se na nossa lista de e-mails"
                variant="secondary"
                inputIcon={
                  <Button
                    variant="secondary"
                    type="submit"
                  >
                    Confirmar
                  </Button>
                }
                placeholder="seu@email.com"
              />
            </form>
          </Box>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Footer;
