import type { InferInput } from "valibot";

import {
  Flex,
  Field,
  Input,
  Grid,
  Box,
  Button,
  Heading,
  Text,
  Link,
  Icon,
  Checkbox,
  Separator,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { boolean, email, nonEmpty, object, pipe, string } from "valibot";

import { PasswordInput } from "@/components/ui/password-input";

export const Route = createFileRoute("/(layout)/(auth)/sign-up/")({
  component: RouteComponent,
});

const SignUpSchema = object({
  email: pipe(string(), nonEmpty(), email()),
  firstName: pipe(string(), nonEmpty()),
  keepLoggedIn: boolean(),
  lastName: pipe(string(), nonEmpty()),
  password: pipe(string(), nonEmpty()),
  passwordConfirmation: pipe(string(), nonEmpty()),
});

type SignUpInput = InferInput<typeof SignUpSchema>;

const defaultValues: SignUpInput = {
  email: "",
  firstName: "",
  keepLoggedIn: false,
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

function RouteComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: SignUpSchema,
    },
  });

  return (
    <Grid flexGrow={1} templateColumns={{ base: "", lg: "repeat(2, 1fr)" }}>
      <Flex align="center" justify="center" padding={{ base: "6", md: "0" }}>
        <Flex direction="column" gap="6" grow="1" maxWidth="xl">
          <Button asChild alignSelf="start" variant="subtle">
            <RouterLink to="/">
              <Icon aria-hidden>
                <ArrowLeftIcon />
              </Icon>
              Go back
            </RouterLink>
          </Button>
          <Flex justify="center" direction="column" gap="2">
            <Heading size="2xl">Create your account</Heading>
            <Box>
              <Text as="span" color="fg.muted">
                Already have an account?
              </Text>{" "}
              <Link asChild color={{ _hover: "fg", base: "fg.muted" }}>
                <RouterLink to="/sign-in">Sign in to your account</RouterLink>
              </Link>
            </Box>
          </Flex>
          <Flex
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
            direction="column"
            gap="6"
          >
            <Flex direction={{ base: "column", md: "row" }} gap="6">
              <form.Field name="firstName">
                {(field) => (
                  <Field.Root>
                    <Field.Label htmlFor={field.name}>First Name</Field.Label>
                    <Input
                      id={field.name}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      name={field.name}
                      type="text"
                      placeholder="Your first name"
                    />
                  </Field.Root>
                )}
              </form.Field>
              <form.Field name="lastName">
                {(field) => (
                  <Field.Root>
                    <Field.Label htmlFor={field.name}>Last Name</Field.Label>
                    <Input
                      id={field.name}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      name={field.name}
                      type="text"
                      placeholder="Your last name"
                    />
                  </Field.Root>
                )}
              </form.Field>
            </Flex>
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
                    type="email"
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
                    value={field.state.value}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                    }}
                    onBlur={field.handleBlur}
                    name={field.name}
                    type="password"
                    visible={showPassword}
                    onVisibleChange={setShowPassword}
                    placeholder="Minimum 6 characters"
                  />
                </Field.Root>
              )}
            </form.Field>
            <form.Field name="passwordConfirmation">
              {(field) => (
                <Field.Root>
                  <Field.Label htmlFor={field.name}>
                    Confirm password
                  </Field.Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                    }}
                    onBlur={field.handleBlur}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                  />
                </Field.Root>
              )}
            </form.Field>
            <form.Field name="keepLoggedIn">
              {(field) => (
                <>
                  <Checkbox.Root
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={(value) => {
                      if (typeof value.checked === "boolean") {
                        field.handleChange(value.checked);
                      }
                    }}
                    onBlur={field.handleBlur}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label>Stay logged in?</Checkbox.Label>
                  </Checkbox.Root>
                </>
              )}
            </form.Field>
            <Button type="submit">Confirm</Button>
          </Flex>
          <Flex align="center" gap="6">
            <Separator flexGrow="1" />
            <Text color="fg.muted">Or</Text>
            <Separator flexGrow="1" />
          </Flex>
          <Button type="button" variant="outline">
            Login with Google
          </Button>
        </Flex>
      </Flex>
      <Box
        display={{ base: "none", lg: "block" }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      ></Box>
    </Grid>
  );
}
