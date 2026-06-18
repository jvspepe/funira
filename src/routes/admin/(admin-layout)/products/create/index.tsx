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
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";

import type { InsertProductWithCategories } from "@/features/products/types";

import { categoriesQueryOptions } from "@/features/categories/queries";
import { InsertProductWithCategoriesSchema } from "@/features/products/types";

const defaultValues: InsertProductWithCategories = {
  categories: [],
  description: "",
  name: "",
};

export const Route = createFileRoute("/admin/(admin-layout)/products/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions());

  const categoriesCollection = createListCollection({
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
    items: categories,
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value, formApi }) => {
      formApi.reset();
    },
    validators: {
      onSubmit: InsertProductWithCategoriesSchema,
    },
  });

  return (
    <Flex
      as="form"
      padding="6"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      id="category-form"
      direction="column"
      gap="6"
      >
          <Flex direction="column">

          <Heading>
              Create a new product
              </Heading>
              <Text color="fg.muted">Fill the form below to add a new product</Text>
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
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                value={field.state.value}
                onBlur={field.handleBlur}
                name={field.name}
                type="text"
                placeholder="Ex: Chairs, Wardrobes, Beds..."
              />
              {field.state.meta?.errors.map((error) => (
                <Field.ErrorText key={error?.message}>
                  {error?.message}
                </Field.ErrorText>
              ))}
            </Field.Root>
          );
        }}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <Field.Root>
            <Field.Label htmlFor={field.name}>Description</Field.Label>
            <Textarea
              id={field.name}
              onChange={(event) => {
                field.handleChange(event.target.value);
              }}
              value={field.state.value}
              onBlur={field.handleBlur}
              name={field.name}
              rows={4}
              placeholder="A brief product description"
            />
            {field.state.meta.errors.length > 0 &&
              field.state.meta.errors.map((error, index) => (
                <Field.ErrorText key={`${field.name}-${index}`}>
                  {error?.message}
                </Field.ErrorText>
              ))}
          </Field.Root>
        )}
      </form.Field>
      <form.Field name="categories">
        {(field) => (
          <Field.Root>
            <Select.Root
              id={field.name}
              ids={{
                trigger: field.name,
              }}
              name={field.name}
              value={field.state.value}
              onValueChange={({ value }) => {
                field.handleChange(value);
              }}
              onInteractOutside={field.handleBlur}
              collection={categoriesCollection}
              multiple
            >
              <Select.Label htmlFor={field.name}>Categories</Select.Label>
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
            {field.state.meta.errors.length > 0 &&
              field.state.meta.errors.map((error, index) => (
                <Field.ErrorText key={`${field.name}-${index}`}>
                  {error?.message}
                </Field.ErrorText>
              ))}
          </Field.Root>
        )}
      </form.Field>
      <form.Field name="name">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field.Root invalid={isInvalid}>
              <Field.Label htmlFor={field.name}>Name</Field.Label>
              <FileUpload.Root
                alignItems="stretch"
                accept={["image/png", "image/jpeg"]}
                maxFiles={10}
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
                    {({ acceptedFiles }) =>
                      acceptedFiles.map((file) => (
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
              {field.state.meta?.errors.map((error) => (
                <Field.ErrorText key={error?.message}>
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
            loadingText="Loading..."
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
