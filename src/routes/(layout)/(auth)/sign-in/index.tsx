import type { InferInput } from "valibot";

import {
  Box,
  Button,
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
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link as RouterLink,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { email, nonEmpty, object, pipe, string } from "valibot";

import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/config/auth-client";
import { authQueryKeys } from "@/features/auth/queries";

export const Route = createFileRoute("/(layout)/(auth)/sign-in/")({
  component: RouteComponent,
});

const SignInSchema = object({
  email: pipe(string(), nonEmpty("Field is required"), email("Invalid e-mail")),
  password: pipe(string(), nonEmpty("Field is required")),
});

type SignInInput = InferInput<typeof SignInSchema>;

const defaultValues: SignInInput = {
  email: "",
  password: "",
};

function RouteComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { queryClient } = Route.useRouteContext();

  const navigate = Route.useNavigate();

  const signInMutation = useMutation({
    mutationFn: async (signInData: SignInInput) => {
      await authClient.signIn.email({
        email: signInData.email,
        password: signInData.password,
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
      await signInMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: SignInSchema,
    },
  });

  return (
    <Grid flexGrow={1} templateColumns={{ base: "", lg: "repeat(2, 1fr)" }}>
      <Box
        display={{ base: "none", lg: "block" }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      />
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
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field.Root invalid={isInvalid}>
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
    </Grid>
  );
}
