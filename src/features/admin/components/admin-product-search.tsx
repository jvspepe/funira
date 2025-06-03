import { Controller, useFormContext } from 'react-hook-form';
import {
  createListCollection,
  Field,
  Group,
  Input,
  Portal,
  Select,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FormSchema } from '@/features/admin/pages/products';

const options = createListCollection({
  items: [
    { label: 'ID', value: 'id' },
    { label: 'Nome', value: 'name' },
    { label: 'Categoria', value: 'category' },
  ],
});

export function AdminProductSearch() {
  const form = useFormContext<FormSchema>();

  const label = form.watch('label');

  const currentOptionLabel = options.items.find(
    (item) => item.value === label[0]
  )?.label;

  return (
    <Group
      attached
      alignItems="end"
    >
      <Controller
        control={form.control}
        name="label"
        render={({ field }) => (
          <Select.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            disabled={field.disabled}
            ref={field.ref}
            collection={options}
            maxWidth="10rem"
          >
            <Select.HiddenSelect />
            <Select.Label>Buscar produto por</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Buscar produto por" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {options.items.map((option) => (
                    <Select.Item
                      item={option}
                      key={option.value}
                    >
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Controller
        control={form.control}
        name="value"
        render={({ field }) => (
          <Field.Root w="fit">
            <VisuallyHidden>
              <Field.Label>
                {`${currentOptionLabel} do produto`}
                <Field.RequiredIndicator />
              </Field.Label>
            </VisuallyHidden>
            <Input
              {...field}
              placeholder={`${currentOptionLabel} do produto`}
            />
            <Field.ErrorText />
          </Field.Root>
        )}
      />
    </Group>
  );
}
