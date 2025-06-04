import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  createListCollection,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  NumberInput,
  Portal,
  Select,
  Separator,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { getCategories } from '@/features/categories/services';
import { updateProduct } from '@/features/products/services';
import { type EditProductSchema, editProductSchema } from './validation';
import { Field } from '@/components/ui/field';

const inputsMaxLength = {
  name: 30,
  summary: 100,
  description: 250,
};

export function EditProductForm({ product }: { product: Product }) {
  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      ...product,
      price: product.price.toString(),
      category: [product.category.id],
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categoriesCollection = useMemo(() => {
    return createListCollection({
      items: categoriesQuery.data ?? [],
      itemToString: (category) => category.label.en,
      itemToValue: (category) => category.id,
    });
  }, [categoriesQuery.data]);

  const onSubmit: SubmitHandler<EditProductSchema> = async (data) => {
    if (!categoriesQuery.data) throw new Error('Nenhuma categoria encontrada');

    const categoryIndex = categoriesQuery.data.findIndex(
      (category) => category.id === data.category[0]
    );

    if (categoryIndex < 0)
      throw new Error('Nenhuma categoria encontrada no índice');

    await updateProduct({
      id: product.id,
      ...data,
      category: categoriesQuery.data[categoryIndex],
      price: z.coerce.number().parse(data.price),
    });
  };

  return (
    <>
      <DevTool control={form.control} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        grow="1"
        gap="{spacing.5}"
      >
        <FormProvider {...form}>
          <Flex
            as="form"
            onSubmit={form.handleSubmit(onSubmit)}
            direction="column"
            gap="{spacing.5}"
            grow="1"
          >
            <Heading>Edit product</Heading>
            <Flex
              direction="column"
              gap="{spacing.5}"
            >
              <Heading size="md">Required Information</Heading>

              <Controller
                name="name.en"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                    label="Name"
                  >
                    <Input
                      {...field}
                      maxLength={inputsMaxLength.name}
                      placeholder="Product name"
                    />
                  </Field>
                )}
              />
              <Flex gap="{spacing.5}">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      invalid={!!fieldState.error}
                      errorText={
                        fieldState.error ? fieldState.error.message : undefined
                      }
                      label="Price"
                    >
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
                        <InputGroup startElement={'$'}>
                          <NumberInput.Input onBlur={field.onBlur} />
                        </InputGroup>
                      </NumberInput.Root>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Field
                      invalid={!!fieldState.error}
                      errorText={
                        fieldState.error ? fieldState.error.message : undefined
                      }
                      label="Category"
                    >
                      <Select.Root
                        name={field.name}
                        value={field.value || []}
                        onValueChange={(state) => field.onChange(state.value)}
                        onInteractOutside={() => field.onBlur()}
                        collection={categoriesCollection}
                        disabled={field.disabled}
                        ref={field.ref}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select a category" />
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
                                  {category.label.en}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field>
                  )}
                />
              </Flex>
            </Flex>
            <Separator />
            <Flex
              direction="column"
              gap="{spacing.5}"
            >
              <Heading size="md">General Information</Heading>
              <Controller
                control={form.control}
                name="summary.en"
                render={({ field, fieldState }) => (
                  <Field
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                    label="Summary"
                  >
                    <Textarea
                      {...field}
                      autoresize
                      rows={1}
                      maxLength={inputsMaxLength.summary}
                      placeholder="Product summary"
                    />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description.en"
                render={({ field, fieldState }) => (
                  <Field
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                    label="Description"
                  >
                    <Textarea
                      {...field}
                      autoresize
                      rows={2}
                      maxLength={inputsMaxLength.description}
                      placeholder="Product description"
                    />
                  </Field>
                )}
              />
              <Flex gap="{spacing.5}">
                <Controller
                  name="dimensions.depth"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      invalid={!!fieldState.error}
                      errorText={
                        fieldState.error ? fieldState.error.message : undefined
                      }
                      label="Depth"
                    >
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

                        <NumberInput.Input onBlur={field.onBlur} />
                      </NumberInput.Root>
                    </Field>
                  )}
                />
                <Controller
                  name="dimensions.height"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      invalid={!!fieldState.error}
                      errorText={
                        fieldState.error ? fieldState.error.message : undefined
                      }
                      label="Height"
                    >
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

                        <NumberInput.Input onBlur={field.onBlur} />
                      </NumberInput.Root>
                    </Field>
                  )}
                />
                <Controller
                  name="dimensions.width"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      invalid={!!fieldState.error}
                      errorText={
                        fieldState.error ? fieldState.error.message : undefined
                      }
                      label="Width"
                    >
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

                        <NumberInput.Input onBlur={field.onBlur} />
                      </NumberInput.Root>
                    </Field>
                  )}
                />
              </Flex>
            </Flex>
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText="Updating..."
            >
              Update product
            </Button>
          </Flex>
        </FormProvider>
        <Image
          src={product.imageCover}
          width={640}
          aspectRatio="golden"
          borderRadius="{radii.l2}"
        />
      </Flex>
    </>
  );
}
