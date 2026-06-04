import { Flex } from "@chakra-ui/react";

import { AdminSignInForm } from "@/features/admin/pages/sign-in/sign-in-form";

export function AdminSignIn() {
  return (
    <Flex align="center" justify="center" minHeight="100dvh">
      <AdminSignInForm />
    </Flex>
  );
}
