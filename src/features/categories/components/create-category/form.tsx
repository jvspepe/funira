import slugify from 'slugify';
import {
  type SubmitHandler,
  type DefaultValues,
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CloseButton, Dialog } from '@chakra-ui/react';
import { type CreateCategorySchema, createCategorySchema } from './validation';
import { createCategory } from '@/features/categories/services';
import { toaster } from '@/components/ui/toaster';
import { TextInput } from '@/components/ui/text-input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const defaultValues: DefaultValues<CreateCategorySchema> = {
  en: '',
  pt: '',
};

export function CreateCategoryForm() {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  const form = useForm<CreateCategorySchema>({
    defaultValues,
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<CreateCategorySchema> = ({ pt, en }) => {
    toaster.promise(
      categoryMutation.mutateAsync({
        label: {
          en,
          pt,
        },
        value: slugify(en, { lower: true }),
      }),
      {
        success: {
          title: 'Sucesso',
          description: 'Categoria criada com sucesso',
        },
        error(arg) {
          return {
            title: 'Erro',
            description: arg.message,
          };
        },
        loading: {
          title: 'Adicionando categoria',
          description: 'Carregando',
        },
        finally: () => form.reset(defaultValues),
      }
    );
  };

  return (
    <FormProvider {...form}>
      <Dialog.Content
        as="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Dialog.Header>
          <Dialog.Title>Nova categoria</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          <Controller
            control={form.control}
            name="pt"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome da categoria"
                error={!!fieldState.error}
                errorText={!!fieldState.error && fieldState.error.message}
                placeholder="Nome da categoria"
              />
            )}
          />
          <Controller
            control={form.control}
            name="en"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome da categoria (inglês)"
                error={!!fieldState.error}
                errorText={!!fieldState.error && fieldState.error.message}
                placeholder="Nome da categoria"
              />
            )}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </Dialog.ActionTrigger>
          <Button type="submit">Confirmar</Button>
        </Dialog.Footer>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </FormProvider>
  );
}
