import { Box } from '@chakra-ui/react';
import RegisterForm from './register-form';

const CreateAccount = () => {
  return (
    <Box
      flexGrow={1}
      display="grid"
      gridTemplateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <RegisterForm />
      </Box>
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        bgSize="cover"
      ></Box>
    </Box>
  );
};

export default CreateAccount;
