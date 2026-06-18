import type { InferInput } from "valibot";

import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  Grid,
  Heading,
  Icon,
  Input,
  Link,
  Separator,
  Text,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { boolean, email, nonEmpty, object, pipe, string } from "valibot";

import { PasswordInput } from "@/components/ui/password-input";

export const Route = createFileRoute("/(layout)/(auth)/sign-in/")({
  component: RouteComponent,
});
const SignUpSchema = object({
  email: pipe(string(), nonEmpty(), email()),

  keepLoggedIn: boolean(),

  password: pipe(string(), nonEmpty()),
});

type SignUpInput = InferInput<typeof SignUpSchema>;

const defaultValues: SignUpInput = {
  email: "",

  keepLoggedIn: false,

  password: "",
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
      <Box
        display={{ base: "none", lg: "block" }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      ></Box>
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
            <Heading size="2xl">Login to your account</Heading>
            <Box>
              <Text as="span" color="fg.muted">
                Don't have an account?
              </Text>{" "}
              <Link asChild color={{ _hover: "fg", base: "fg.muted" }}>
                <RouterLink to="/sign-up">Create your account</RouterLink>
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
    </Grid>
  );
}
