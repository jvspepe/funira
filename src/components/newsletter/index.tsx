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
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { CircleCheck } from 'lucide-react';
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
          padding="1.5rem"
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'center' }}
        >
          <Box
            as="section"
            display="flex"
            flexDirection="column"
            gap="1.25rem"
            padding={{ sm: '5rem 0' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="0.75rem"
              maxWidth="35rem"
              textAlign={{ sm: 'center' }}
            >
              <Heading
                as="h4"
                color="white"
                fontSize={{ base: '1.5rem', xl: '2rem' }}
                fontWeight="normal"
              >
                Junte-se ao clube e aproveite os benefícios.
              </Heading>
              <Text
                color="white"
                fontSize={{ base: '0.875rem', xl: '1.125rem' }}
              >
                Cadastre-se para receber nossa newsletter e receba ofertas
                exclusivas em novas coleções, liquidações, lojas pop-up e muito
                mais.
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              gap="0.5rem"
              alignSelf={{ sm: 'center' }}
            >
              {benefits.map((benefit) => (
                <Box
                  key={benefit}
                  as="span"
                  color="white"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <CircleCheck size={16} />
                  {benefit}
                </Box>
              ))}
            </Box>
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
                  <Field.Root invalid={fieldState.error && true}>
                    <VisuallyHidden>
                      <Field.Label htmlFor={field.name}>Seu e-mail</Field.Label>
                    </VisuallyHidden>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="Digite seu e-mail"
                    />
                    {fieldState.error && (
                      <Field.ErrorText>
                        {fieldState.error.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                )}
              />
              <Button type="submit">Confirmar</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
