import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  Field,
  Group,
  Heading,
  Icon,
  Input,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { CircleCheckIcon } from 'lucide-react';
import { toaster } from '@/components/ui/toaster';

const benefits = ['Ofertas Exclusivas', 'Eventos', 'Descontos'];

const formSchema = z.object({
  email: z.string().email().nonempty(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  email: '',
};

const Newsletter = () => {
  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = ({ email }) => {
    toaster.create({
      title: 'E-mail cadastrado com sucesso',
      description: `O e-mail ${email} irá receber notícias e promoções da nossa loja!`,
      type: 'success',
    });

    form.reset(defaultValues);
  };

  return (
    <Box
      backgroundImage="url('/images/newsletter.jpg')"
      backgroundSize="cover"
    >
      <Container>
        <Box
          display="flex"
          paddingBlock="{spacing.6}"
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'center' }}
        >
          <Box
            as="section"
            display="flex"
            flexDirection="column"
            gap="{spacing.6}"
            padding={{ sm: '5rem 0' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="{spacing.4}"
              maxWidth="35rem"
              textAlign={{ sm: 'center' }}
            >
              <Heading
                as="h4"
                color="white"
                fontSize={{ base: '2xl', xl: '2rem' }}
                fontWeight="normal"
              >
                Junte-se ao clube e aproveite os benefícios.
              </Heading>
              <Text
                color="white"
                fontSize={{ base: 'sm', xl: 'lg' }}
              >
                Cadastre-se para receber nossa newsletter e receba ofertas
                exclusivas em novas coleções, liquidações, lojas pop-up e muito
                mais.
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              gap="{spacing.4}"
              alignSelf={{ sm: 'center' }}
            >
              {benefits.map((benefit) => (
                <Box
                  key={benefit}
                  as="span"
                  color="white"
                  display="flex"
                  alignItems="center"
                  gap="{spacing.2}"
                >
                  <Icon size="md">
                    <CircleCheckIcon />
                  </Icon>
                  {benefit}
                </Box>
              ))}
            </Box>
            <Group
              as="form"
              onSubmit={form.handleSubmit(onSubmit)}
              attached
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field.Root invalid={fieldState.error && true}>
                    <VisuallyHidden>
                      <Field.Label htmlFor={field.name}>Seu e-mail</Field.Label>
                    </VisuallyHidden>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="Digite seu e-mail"
                      variant="subtle"
                      borderRightRadius="0"
                      size="xl"
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
                size="xl"
              >
                Confirmar
              </Button>
            </Group>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
