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
  Separator,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  useRouter,
  Link as RouterLink,
} from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { email, nonEmpty, object, pipe, string } from "valibot";

import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/config/auth-client";
import { authQueryKeys } from "@/features/auth/queries";

export const Route = createFileRoute("/(layout)/(auth)/sign-up/")({
  component: RouteComponent,
});

const SignUpSchema = object({
  email: pipe(string(), nonEmpty("Field is required"), email("Invalid e-mail")),
  firstName: pipe(string(), nonEmpty("Field is required")),
  lastName: pipe(string(), nonEmpty("Field is required")),
  password: pipe(string(), nonEmpty("Field is required")),
  passwordConfirmation: pipe(string(), nonEmpty("Field is required")),
});

type SignUpInput = InferInput<typeof SignUpSchema>;

const defaultValues: SignUpInput = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

function RouteComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { queryClient } = Route.useRouteContext();

  const navigate = Route.useNavigate();

  const signUpMutation = useMutation({
    mutationFn: async (signUpData: SignUpInput) => {
      await authClient.signUp.email({
        email: signUpData.email,
        name: `${signUpData.firstName} ${signUpData.lastName}`,
        password: signUpData.password,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });

      await router.invalidate();

      await navigate({ to: "/" });
    },
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await signUpMutation.mutateAsync(value);
    },
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
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field.Root invalid={isInvalid}>
                      <Field.Label htmlFor={field.name}>First Name</Field.Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Your first name"
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
              <form.Field name="lastName">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field.Root invalid={isInvalid}>
                      <Field.Label htmlFor={field.name}>Last Name</Field.Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Your last name"
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
            </Flex>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field.Root invalid={isInvalid}>
                    <Field.Label htmlFor={field.name}>E-mail</Field.Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="your@email.com"
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
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field.Root invalid={isInvalid}>
                    <Field.Label htmlFor={field.name}>Password</Field.Label>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={field.state.value}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      onBlur={field.handleBlur}
                      visible={showPassword}
                      onVisibleChange={setShowPassword}
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
            <form.Field name="passwordConfirmation">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field.Root invalid={isInvalid}>
                    <Field.Label htmlFor={field.name}>
                      Confirm password
                    </Field.Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
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

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  disabled={!canSubmit}
                  loading={isSubmitting}
                  loadingText="Confirming..."
                  type="submit"
                >
                  Confirm
                </Button>
              )}
            </form.Subscribe>
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
      />
    </Grid>
  );
}
