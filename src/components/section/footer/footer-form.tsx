import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Field, Heading, Input, Group } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import {
  type FooterFormSchema,
  footerFormDefaultValues,
  footerFormSchema,
} from './validation';

export function FooterForm() {
  const form = useForm<FooterFormSchema>({
    defaultValues: footerFormDefaultValues,
    resolver: zodResolver(footerFormSchema),
  });

  const onSubmit: SubmitHandler<FooterFormSchema> = ({ email }) => {
    toaster.create({
      title: `E-mail ${email} cadastrado com sucesso`,
      description: 'Seu e-mail irá receber novidades de nossa empresa',
      type: 'info',
    });

    form.reset(footerFormDefaultValues);
  };

  return (
    <Group
      as="form"
      onSubmit={form.handleSubmit(onSubmit)}
      flexGrow="1"
      height="min-content"
      attached
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Heading asChild>
              <Field.Label
                htmlFor={field.name}
                fontSize="md"
              >
                Inscreva-se na nossa lista de e-mails
              </Field.Label>
            </Heading>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="Digite seu e-mail"
              variant="subtle"
              borderRightRadius="0"
            />
            {fieldState.error && (
              <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
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
  );
}
