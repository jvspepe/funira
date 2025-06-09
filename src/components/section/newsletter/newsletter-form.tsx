import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Field, Group, Input, VisuallyHidden } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import {
  type NewsletterFormSchema,
  newsletterFormSchema,
  newsletterFormDefaultValues,
} from './validation';
import { useTranslation } from 'react-i18next';

export function NewsletterForm() {
  const form = useForm<NewsletterFormSchema>({
    defaultValues: newsletterFormDefaultValues,
    resolver: zodResolver(newsletterFormSchema),
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<NewsletterFormSchema> = ({ email }) => {
    toaster.create({
      title: t('newsletter.success.title'),
      description: t('newsletter.success.description', {
        email,
      }),
      type: 'success',
    });

    form.reset(newsletterFormDefaultValues);
  };

  return (
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
              placeholder={t('common:inputs.emailPlaceholder')}
              variant="subtle"
              borderRightRadius="0"
              size="xl"
            />

            {fieldState.error && (
              <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
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
  );
}
