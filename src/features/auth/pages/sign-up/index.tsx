import { Box, Flex, Grid } from '@chakra-ui/react';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

export function SignUpPage() {
  return (
    <Grid
      flexGrow={1}
      templateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
    >
      <Flex
        align="center"
        justify="center"
      >
        <SignUpForm />
      </Flex>
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      ></Box>
    </Grid>
  );
}
