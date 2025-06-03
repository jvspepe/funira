import { Box, Flex, Grid } from '@chakra-ui/react';
import { SignInForm } from '@/features/auth/components/sign-in-form';

export function SignInPage() {
  return (
    <Grid
      flexGrow={1}
      templateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
    >
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        backgroundSize="cover"
      ></Box>
      <Flex
        align="center"
        justify="center"
      >
        <SignInForm />
      </Flex>
    </Grid>
  );
}
