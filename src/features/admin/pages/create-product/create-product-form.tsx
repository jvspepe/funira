import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import {
  type SubmitHandler,
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  Collapsible,
  createListCollection,
  FileUpload,
  Flex,
  Heading,
  Icon,
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
import { toaster } from '@/components/ui/toaster';
import { getCategories } from '@/features/categories/services';
import { createProduct } from '@/features/products/services';

import {
  type CreateProductSchema,
  createProductSchema,
  defaultValues,
} from './create-product-validation';
import { Trans, useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Field } from '@/components/ui/field';
import { ChevronDownIcon, UploadIcon } from 'lucide-react';

export function CreateProductForm() {
  const form = useForm<CreateProductSchema>({
    defaultValues,
    resolver: zodResolver(createProductSchema),
  });

  const imageCover = form.register('imageCover');

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { t, i18n } = useTranslation();

  const categoriesCollection = useMemo(() => {
    return createListCollection({
      items: categoriesQuery.data ?? [],
      itemToString: (category) =>
        category.label[i18n.resolvedLanguage as 'pt' | 'en'] ??
        category.label.en,
      itemToValue: (category) => category.id,
    });
  }, [categoriesQuery.data, i18n.resolvedLanguage]);

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    if (!data.imageCover) throw new Error('Imagem obrigatória');

    if (!categoriesQuery.data) throw new Error('Nenhuma categoria encontrada');

    const categoryIndex = categoriesQuery.data.findIndex(
      (category) => category.id === data.category[0]
    );

    if (categoryIndex < 0)
      throw new Error('Nenhuma categoria encontrada no índice');

    toaster.promise(
      createProduct({
        name: data.name,
        price: z.coerce.number().parse(data.price),
        category: categoriesQuery.data[categoryIndex],
        summary: data.summary,
        description: data.description,
        dimensions: {
          depth: data.dimensions.depth,
          height: data.dimensions.height,
          width: data.dimensions.width,
        },
        imageCover: data.imageCover[0],
        images: [],
      }),
      {
        success: {
          title: t('products.actions.create-success'),
        },
        error(arg) {
          console.log(arg);
          return {
            title: arg.message,
          };
        },
        loading: {
          title: t('common:state.loading'),
        },
        finally: () => form.reset(),
      }
    );
  };

  return (
    <>
      <DevTool control={form.control} />
      <FormProvider {...form}>
        <Flex
          as="form"
          onSubmit={form.handleSubmit(onSubmit)}
          direction="column"
          gap="{spacing.5}"
          grow="1"
        >
          <Heading>{t('products.actions.create')}</Heading>
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
                  errorText={!!fieldState.error && fieldState.error.message}
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
                    <InputGroup startElement={'R$'}>
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
                  errorText={!!fieldState.error && fieldState.error.message}
                >
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
            align="center"
            gap="{spacing.5}"
          >
            <Controller
              name="dimensions.depth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  label={t('products.details.depth')}
                  invalid={!!fieldState.error}
                >
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
                >
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
                >
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
                      placeholder="0 cm"
                    />
                  </NumberInput.Root>
                </Field>
              )}
            />
          </Flex>
          <FileUpload.Root {...imageCover}>
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone
              width="full"
              height="full"
            >
              <Icon
                size="md"
                color="fg.muted"
              >
                <UploadIcon />
              </Icon>
              <FileUpload.DropzoneContent>
                <Trans
                  t={t}
                  i18nKey="products.details.file"
                >
                  <Box>Drag files or click here (max 5 files)</Box>
                  <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                </Trans>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText={t('common:state.loading')}
              size="lg"
            >
              {t('common:buttons.confirm')}
            </Button>
          </Box>
        </Flex>
      </FormProvider>
    </>
  );
}
