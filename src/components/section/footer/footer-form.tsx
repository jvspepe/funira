import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FooterFormSchema> = () => {
    toaster.create({
      title: t('footer.mailing.success'),
      type: 'success',
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
                {t('footer.mailing.title')}
              </Field.Label>
            </Heading>
            <Input
              {...field}
              id={field.name}
              type="email"
              variant="subtle"
              borderRightRadius="0"
              placeholder={t('common:inputs.emailPlaceholder')}
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
        {t('common:buttons.confirm')}
      </Button>
    </Group>
  );
}
