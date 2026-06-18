import type { InferInput } from "valibot";

import { Button, Field, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { nonEmpty, object, pipe, string } from "valibot";

import { PasswordInput } from "@/components/ui/password-input";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

const SignInSchema = object({
  email: pipe(string(), nonEmpty()),
  password: pipe(string(), nonEmpty()),
});

type SignInInput = InferInput<typeof SignInSchema>;

const defaultValues: SignInInput = {
  email: "",
  password: "",
};

function RouteComponent() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: SignInSchema,
    },
  });

  return (
    <Flex
      minHeight="svh"
      align="center"
      justify="center"
      padding={{ base: "6", md: "0" }}
    >
      <Flex direction="column" gap="6" grow="1" maxWidth="xl">
        <Button asChild alignSelf="start" variant="subtle">
          <RouterLink to="/">
            <ArrowLeftIcon />
            Back to main website
          </RouterLink>
        </Button>
        <Flex justify="center" direction="column" gap="2">
          <Heading size="2xl">Funira's Admin Panel</Heading>
          <Text color="fg.muted">
            Don't have access? Contact your administrator
          </Text>
        </Flex>
        <Flex as="form" direction="column" gap="6">
          <form.Field name="email">
            {(field) => (
              <Field.Root>
                <Field.Label htmlFor={field.name}>E-mail</Field.Label>
                <Input
                  id={field.name}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  name={field.name}
                  type="text"
                  placeholder="your@email.com"
                />
              </Field.Root>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <Field.Root>
                <Field.Label htmlFor={field.name}>Password</Field.Label>
                <PasswordInput
                  id={field.name}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  name={field.name}
                  placeholder="Your password"
                />
              </Field.Root>
            )}
          </form.Field>
          <Button type="submit">Confirm</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
