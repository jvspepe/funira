import { AdminSignInForm } from '@/features/admin/components/sign-in-form';
import { Box } from '@chakra-ui/react';

export function AdminSignIn() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100dvh"
    >
      <AdminSignInForm />
    </Box>
  );
}
