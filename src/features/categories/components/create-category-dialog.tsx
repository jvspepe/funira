import { Button, Dialog, Field, Flex, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PlusIcon } from "lucide-react";

import type { Category, InsertCategory } from "@/features/categories/types";

import { createCategory } from "@/features/categories/functions";
import { categoryQueryKeys } from "@/features/categories/queries";
import { InsertCategorySchema } from "@/features/categories/types";

const defaultValues: InsertCategory = {
  description: "",
  name: "",
};

interface CreateCategoryDialogProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export function CreateCategoryDialog({
  open,
  setIsOpen,
}: CreateCategoryDialogProps) {
  const routeApi = getRouteApi("/admin/(admin-layout)/categories/");

  const { queryClient } = routeApi.useRouteContext();

  const createCategoryFn = useServerFn(createCategory);

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData: InsertCategory) =>
      await createCategoryFn({ data: categoryData }),
    mutationKey: categoryQueryKeys.list,
    onSuccess: (createdCategory) => {
      queryClient.setQueryData(
        categoryQueryKeys.list,
        (previousCategories: Category[]) => [
          ...previousCategories,
          createdCategory,
        ]
      );
    },
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await createCategoryMutation.mutateAsync(value);

      formApi.reset();

      setIsOpen(false);
    },
    validators: {
      onSubmit: InsertCategorySchema,
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(event) => {
        setIsOpen(event.open);
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Flex direction="column">
              <Dialog.Title>New Category</Dialog.Title>
              <Dialog.Description>
                Fill the form below in order to create a new category
              </Dialog.Description>
            </Flex>
          </Dialog.Header>
          <Dialog.Body>
            <Flex
              as="form"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
              }}
              id="category-form"
              direction="column"
              gap="6"
            >
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
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  form="category-form"
                  disabled={!canSubmit}
                  loading={isSubmitting}
                  loadingText="Loading..."
                >
                  <PlusIcon />
                  Create category
                </Button>
              )}
            </form.Subscribe>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
