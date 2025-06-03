import { Controller, useFormContext } from 'react-hook-form';
import {
  Badge,
  Box,
  Collapsible,
  Field,
  Heading,
  Textarea,
} from '@chakra-ui/react';
import { TextInput } from '@/components/ui/text-input';
import { CreateProductSchema } from './form-schema';

const FormMain = () => {
  const form = useFormContext<CreateProductSchema>();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        <Heading
          display="flex"
          alignItems="center"
          gap="1rem"
        >
          <Box
            display="flex"
            alignItems="center"
            gap="0.25rem"
          >
            <span>Informações</span>
            <Badge variant="surface">Português</Badge>
          </Box>
          <hr style={{ height: '1px', width: '100%' }} />
        </Heading>
        <Controller
          name="name.pt"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              type="text"
              label="Nome"
              error={!!fieldState.error}
              errorText={!!fieldState.error && fieldState.error.message}
              placeholder="Nome do produto (português)"
            />
          )}
        />
        <Controller
          control={form.control}
          name="summary.pt"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>Resumo</Field.Label>
              <Textarea {...field} />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />
        <Controller
          control={form.control}
          name="description.pt"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>
                Descrição
                <Field.RequiredIndicator
                  fallback={
                    <Badge
                      size="xs"
                      variant="surface"
                    >
                      Opcional
                    </Badge>
                  }
                />
              </Field.Label>
              <Textarea {...field} />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />
      </Box>
      <Collapsible.Root
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        <Collapsible.Trigger>
          <Heading
            display="flex"
            alignItems="center"
            gap="1rem"
          >
            <Box
              display="flex"
              alignItems="center"
              gap="0.25rem"
            >
              <span>Informações</span>
              <Badge variant="surface">Inglês</Badge>
            </Box>
            <hr style={{ height: '1px', width: '100%' }} />
          </Heading>
        </Collapsible.Trigger>
        <Collapsible.Content
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Controller
            name="name.en"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome"
                error={!!fieldState.error}
                errorText={!!fieldState.error && fieldState.error.message}
                placeholder="Nome do produto (inglês)"
              />
            )}
          />
          <Controller
            control={form.control}
            name="summary.en"
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error}>
                <Field.Label>Resumo</Field.Label>
                <Textarea {...field} />
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
          <Controller
            control={form.control}
            name="description.en"
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error}>
                <Field.Label>
                  Descrição
                  <Field.RequiredIndicator
                    fallback={
                      <Badge
                        size="xs"
                        variant="surface"
                      >
                        Opcional
                      </Badge>
                    }
                  />
                </Field.Label>
                <Textarea {...field} />
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

export default FormMain;
