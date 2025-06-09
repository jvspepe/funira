import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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
  Collapsible,
  createListCollection,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  NumberInput,
  Portal,
  Select,
  Separator,
  Span,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { type Product } from '@/@types/models';
import { getCategories } from '@/features/categories/services';
import { updateProduct } from '@/features/products/services';
import {
  type EditProductSchema,
  editProductSchema,
} from './edit-product-validation';
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

  const { t, i18n } = useTranslation();

  const categoriesCollection = useMemo(() => {
    return createListCollection({
      items: categoriesQuery.data ?? [],
      itemToString: (category) =>
        category.label[i18n.resolvedLanguage as 'pt' | 'en'],
      itemToValue: (category) => category.id,
    });
  }, [categoriesQuery.data, i18n.resolvedLanguage]);

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
            <Heading>{t('products.actions.update')}</Heading>
            <Flex
              direction="column"
              gap="{spacing.5}"
            >
              <Controller
                name="name.en"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.name')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                  >
                    <Input
                      {...field}
                      maxLength={inputsMaxLength.name}
                      placeholder={t('products.details.name')}
                    />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="summary.en"
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.summary')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                  >
                    <Textarea
                      {...field}
                      autoresize
                      rows={2}
                      maxLength={inputsMaxLength.summary}
                      placeholder={t('products.details.summary')}
                    />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description.en"
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.description')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
                  >
                    <Textarea
                      {...field}
                      autoresize
                      rows={3}
                      maxLength={inputsMaxLength.description}
                      placeholder={t('products.details.description')}
                    />
                  </Field>
                )}
              />
              <Collapsible.Root>
                <Flex align="center">
                  <Collapsible.Trigger asChild>
                    <Button
                      type="button"
                      variant="surface"
                    >
                      <Span>Portuguese variation</Span>
                      <Icon size="sm">
                        <ChevronDownIcon />
                      </Icon>
                    </Button>
                  </Collapsible.Trigger>
                  <Separator flexGrow="1" />
                </Flex>
                <Collapsible.Content>
                  <Flex
                    direction="column"
                    gap="{spacing.5}"
                    paddingTop="{spacing.5}"
                  >
                    <Controller
                      name="name.pt"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          label={t('products.details.name')}
                          invalid={!!fieldState.error}
                          errorText={
                            fieldState.error
                              ? fieldState.error.message
                              : undefined
                          }
                        >
                          <Input
                            {...field}
                            maxLength={inputsMaxLength.name}
                            placeholder={t('products.details.name')}
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="summary.pt"
                      render={({ field, fieldState }) => (
                        <Field
                          label={t('products.details.summary')}
                          invalid={!!fieldState.error}
                          errorText={
                            fieldState.error
                              ? fieldState.error.message
                              : undefined
                          }
                        >
                          <Textarea
                            {...field}
                            autoresize
                            rows={2}
                            maxLength={inputsMaxLength.summary}
                            placeholder={t('products.details.summary')}
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="description.pt"
                      render={({ field, fieldState }) => (
                        <Field
                          label={t('products.details.description')}
                          invalid={!!fieldState.error}
                          errorText={
                            fieldState.error
                              ? fieldState.error.message
                              : undefined
                          }
                        >
                          <Textarea
                            {...field}
                            autoresize
                            rows={3}
                            maxLength={inputsMaxLength.description}
                            placeholder={t('products.details.description')}
                          />
                        </Field>
                      )}
                    />
                  </Flex>
                </Collapsible.Content>
              </Collapsible.Root>
            </Flex>
            <Separator />
            <Flex
              align="center"
              gap="{spacing.5}"
            >
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.price')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
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
                        <NumberInput.Input
                          onBlur={field.onBlur}
                          placeholder={t('products.details.price')}
                        />
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
                    label={t('common:inputs.products.category')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
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
                          <Select.ValueText
                            placeholder={t(
                              'products.details.categoryPlaceholder'
                            )}
                          />
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
                                {
                                  category.label[
                                    i18n.resolvedLanguage as 'pt' | 'en'
                                  ]
                                }
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
            <Flex
              align="column"
              gap="{spacing.5}"
            >
              <Controller
                name="dimensions.depth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.depth')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
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
                      <NumberInput.Input
                        onBlur={field.onBlur}
                        placeholder="0 cm"
                      />
                    </NumberInput.Root>
                  </Field>
                )}
              />
              <Controller
                name="dimensions.height"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.height')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
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

                      <NumberInput.Input
                        onBlur={field.onBlur}
                        placeholder="0 cm"
                      />
                    </NumberInput.Root>
                  </Field>
                )}
              />
              <Controller
                name="dimensions.width"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    label={t('products.details.width')}
                    invalid={!!fieldState.error}
                    errorText={
                      fieldState.error ? fieldState.error.message : undefined
                    }
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

                      <NumberInput.Input
                        onBlur={field.onBlur}
                        placeholder="0 cm"
                      />
                    </NumberInput.Root>
                  </Field>
                )}
              />
            </Flex>
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText={t('common:state.loading')}
              size="lg"
            >
              {t('common:buttons.confirm')}
            </Button>
          </Flex>
        </FormProvider>
        <Image
          src={product.imageCover}
          width={640}
          aspectRatio="golden"
          borderRadius="{radii.l2}"
          maxHeight="40rem"
        />
      </Flex>
    </>
  );
}
