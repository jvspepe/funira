import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import {
  createListCollection,
  Box,
  Field,
  Heading,
  InputGroup,
  NumberInput,
  Portal,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { type CreateProductSchema } from './form-schema.ts';
import { getCategories } from '@/features/categories/services';

const FormDetails = () => {
  const form = useFormContext<CreateProductSchema>();

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categoriesCollection = useMemo(() => {
    return createListCollection({
      items: categoriesQuery.data ?? [],
      itemToString: (category) => category.label.pt,
      itemToValue: (category) => category.id,
    });
  }, [categoriesQuery.data]);

  return (
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
        <span>Detalhes</span>
        <hr style={{ height: '1px', width: '100%' }} />
      </Heading>
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Field.Label>Preço</Field.Label>
            <NumberInput.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
              step={0.01}
              min={0}
              disabled={field.disabled}
              width="full"
            >
              <NumberInput.Control />
              <InputGroup startElement={'R$'}>
                <NumberInput.Input onBlur={field.onBlur} />
              </InputGroup>
            </NumberInput.Root>
            <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />
      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Field.Label>Categoria</Field.Label>
            <Select.Root
              name={field.name}
              value={field.value}
              onValueChange={(state) => field.onChange(state.value)}
              onInteractOutside={() => field.onBlur()}
              collection={categoriesCollection}
              disabled={field.disabled}
              ref={field.ref}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Selecionar categoria" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger />
                  {categoriesQuery.isLoading && (
                    <Spinner
                      size="xs"
                      borderWidth="1.5px"
                      color="fg.muted"
                    />
                  )}
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {categoriesCollection.items.map((category) => (
                      <Select.Item
                        item={category}
                        key={category.id}
                      >
                        {category.label.pt}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />

      <Controller
        name="dimensions.depth"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Field.Label>Profundidade</Field.Label>
            <NumberInput.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
              min={0}
              disabled={field.disabled}
              width="full"
            >
              <NumberInput.Control />
              <NumberInput.Input
                onBlur={field.onBlur}
                placeholder="Em cm"
              />
            </NumberInput.Root>
            <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />
      <Controller
        name="dimensions.height"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Field.Label>Altura</Field.Label>
            <NumberInput.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
              min={0}
              disabled={field.disabled}
              width="full"
            >
              <NumberInput.Control />
              <NumberInput.Input
                onBlur={field.onBlur}
                placeholder="Em cm"
              />
            </NumberInput.Root>
            <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />
      <Controller
        name="dimensions.width"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field.Root invalid={!!fieldState.error}>
            <Field.Label>Largura</Field.Label>
            <NumberInput.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
              min={0}
              disabled={field.disabled}
              width="full"
            >
              <NumberInput.Control />
              <NumberInput.Input
                onBlur={field.onBlur}
                placeholder="Em cm"
              />
            </NumberInput.Root>
            <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />
    </Box>
  );
};

export default FormDetails;
