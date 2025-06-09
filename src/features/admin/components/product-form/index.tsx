import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import {
  Controller,
  DefaultValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
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
import { getCategories } from '@/features/categories/services';
import { Trans, useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Field } from '@/components/ui/field';
import { ChevronDownIcon, UploadIcon } from 'lucide-react';
import { Product } from '@/@types/models';
import { zodResolver } from '@hookform/resolvers/zod';

const productSchema = z.object({
  name: z.object({
    en: z.string().min(1, 'Nome em inglês é obrigatório'),
    pt: z.string().min(1, 'Nome em português é obrigatório'),
  }),
  summary: z.object({
    en: z.string().min(1, 'Resumo em inglês é obrigatório'),
    pt: z.string().min(1, 'Resumo em português é obrigatório'),
  }),
  description: z.object({
    en: z.string().min(1, 'Descrição em inglês é obrigatória'),
    pt: z.string().min(1, 'Descrição em português é obrigatória'),
  }),
  price: z.string().nonempty(),
  category: z.string().nonempty().array(),
  dimensions: z.object({
    depth: z.string().optional(),
    height: z.string().nonempty(),
    width: z.string().nonempty(),
  }),
  imageCover: z.instanceof(FileList).nullable(),
});

type ProductSchema = z.infer<typeof productSchema>;

const defaultValues: DefaultValues<ProductSchema> = {
  name: {
    en: '',
    pt: '',
  },
  price: '0',
  category: [],
  summary: {
    en: '',
    pt: '',
  },
  description: {
    en: '',
    pt: '',
  },
  dimensions: {
    depth: '',
    height: '',
    width: '',
  },
  imageCover: null,
};

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductSchema) => Promise<void>;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const form = useForm<ProductSchema>({
    defaultValues: product
      ? {
          ...product,
          price: product.price.toString(),
          category: [product.category.id],
          imageCover: null,
        }
      : defaultValues,
    resolver: zodResolver(productSchema),
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
