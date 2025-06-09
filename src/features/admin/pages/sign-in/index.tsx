import { AdminSignInForm } from '@/features/admin/pages/sign-in/sign-in-form';
import { Flex } from '@chakra-ui/react';

export function AdminSignIn() {
  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100dvh"
    >
      <AdminSignInForm />
    </Flex>
  );
}
