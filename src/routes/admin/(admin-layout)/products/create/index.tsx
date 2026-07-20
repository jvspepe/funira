// oxlint-disable unicorn/no-array-for-each
import {
  Box,
  Button,
  createListCollection,
  Field,
  FileUpload,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  NumberInput,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeftIcon, PlusIcon, UploadIcon } from "lucide-react";

import type { InsertProductWithDetails } from "@/features/products/types";

import { toaster } from "@/components/ui/toaster";
import { categoriesQueryOptions } from "@/features/categories/queries";
import { createProduct } from "@/features/products/functions";
import { InsertProductWithDetailsSchema } from "@/features/products/types";

const defaultValues: InsertProductWithDetails = {
  categories: [],
  description: "",
  images: [],
  name: "",
  price: "0",
};

export const Route = createFileRoute("/admin/(admin-layout)/products/create/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(categoriesQueryOptions());
  },
});

function RouteComponent() {
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions());
  const navigate = useNavigate();
  const createProductFn = useServerFn(createProduct);

  const categoriesCollection = createListCollection({
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
    items: categories,
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      const formData = new FormData();

      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", value.price);

      value.categories.forEach((category) => {
        formData.append("categories", category);
      });

      value.images.forEach((image) => {
        formData.append("images", image);
      });

      try {
        await createProductFn({ data: formData });
      } catch (error) {
        console.error(error);

        toaster.create({ title: "Failed to create product", type: "error" });
        return;
      }

      toaster.create({
        title: "Product created successfully!",
        type: "success",
      });
      formApi.reset();
      await navigate({ to: "/admin/products" });
    },
    validators: {
      onSubmit: InsertProductWithDetailsSchema,
    },
  });

  return (
    <Flex
      as="form"
      padding="6"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      direction="column"
      gap="6"
    >
      <Flex direction="column" gap="6">
        <Button asChild alignSelf="self-start">
          <Link to="/admin/products">
            <Icon size="sm">
              <ArrowLeftIcon />
            </Icon>
            Back to Products
          </Link>
        </Button>
        <Flex direction="column">
          <Heading>Create a new product</Heading>
          <Text color="fg.muted">Fill the form below to add a new product</Text>
        </Flex>
      </Flex>
      <form.Field name="name">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field.Root invalid={isInvalid}>
              <Field.Label htmlFor={field.name}>Name</Field.Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Ex: Chairs, Wardrobes, Beds..."
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.map((error) => (
                <Field.ErrorText key={error?.message}>
                  {error?.message}
                </Field.ErrorText>
              ))}
            </Field.Root>
          );
        }}
      </form.Field>
      <form.Field name="description">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field.Root invalid={isInvalid}>
              <Field.Label htmlFor={field.name}>Description</Field.Label>
              <Textarea
                id={field.name}
                name={field.name}
                rows={4}
                placeholder="A brief product description"
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.map((error, index) => (
                <Field.ErrorText key={`${field.name}-${index}`}>
                  {error?.message}
                </Field.ErrorText>
              ))}
            </Field.Root>
          );
        }}
      </form.Field>
      <Flex gap="4">
        <form.Field name="price">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field.Root invalid={isInvalid}>
                <Field.Label htmlFor={field.name}>Price</Field.Label>
                <NumberInput.Root
                  value={field.state.value}
                  onValueChange={({ value }) => {
                    field.handleChange(value);
                  }}
                  onBlur={field.handleBlur}
                  step={0.01}
                  min={0}
                >
                  <NumberInput.Control />
                  <InputGroup startElement="R$">
                    <NumberInput.Input id={field.name} name={field.name} />
                  </InputGroup>
                </NumberInput.Root>
                {field.state.meta.errors.map((error) => (
                  <Field.ErrorText key={error?.message}>
                    {error?.message}
                  </Field.ErrorText>
                ))}
              </Field.Root>
            );
          }}
        </form.Field>
        <form.Field name="categories">
          {(field) => (
            <Field.Root flexGrow={1}>
              <Select.Root
                name={field.name}
                value={field.state.value}
                onValueChange={({ value }) => {
                  field.handleChange(value);
                }}
                onInteractOutside={field.handleBlur}
                collection={categoriesCollection}
                multiple
              >
                <Select.Label>Categories</Select.Label>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select categories" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>Categories</Select.ItemGroupLabel>
                      {categoriesCollection.items.map((category) => (
                        <Select.Item item={category} key={category.id}>
                          {category.name}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              {field.state.meta.errors.map((error, index) => (
                <Field.ErrorText key={`${field.name}-${index}`}>
                  {error?.message}
                </Field.ErrorText>
              ))}
            </Field.Root>
          )}
        </form.Field>
      </Flex>
      <form.Field name="images">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field.Root invalid={isInvalid}>
              <Field.Label htmlFor={field.name}>Images</Field.Label>
              <FileUpload.Root
                id={field.name}
                name={field.name}
                acceptedFiles={field.state.value}
                onFileChange={(details) => {
                  field.handleChange(details.acceptedFiles);
                }}
                accept={["image/png", "image/jpeg"]}
                maxFiles={5}
                maxFileSize={1024 * 1024 * 5}
                alignItems="stretch"
              >
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                    <UploadIcon />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">
                      .png, .jpg up to 5MB per file, max. of 5 files
                    </Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.ItemGroup
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  <FileUpload.Context>
                    {({ acceptedFiles: files }) =>
                      files.map((file) => (
                        <FileUpload.Item
                          key={file.name}
                          file={file}
                          display="flex"
                          flexDirection="column"
                          alignItems="stretch"
                          gap="2"
                        >
                          <Flex
                            gap="2"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <FileUpload.ItemName />
                            <Flex align="center" gap="2">
                              <FileUpload.ItemSizeText />
                              <FileUpload.ItemDeleteTrigger />
                            </Flex>
                          </Flex>
                          <FileUpload.ItemPreviewImage />
                        </FileUpload.Item>
                      ))
                    }
                  </FileUpload.Context>
                </FileUpload.ItemGroup>
              </FileUpload.Root>
              {field.state.meta.errors.map((error, index) => (
                <Field.ErrorText key={`${field.name}-error-${index}`}>
                  {error?.message}
                </Field.ErrorText>
              ))}
            </Field.Root>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            loading={isSubmitting}
            loadingText="Creating product..."
            alignSelf="end"
          >
            <Icon size="sm">
              <PlusIcon />
            </Icon>
            Create product
          </Button>
        )}
      </form.Subscribe>
    </Flex>
  );
}
