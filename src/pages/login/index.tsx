import { Box } from '@chakra-ui/react';
import LoginForm from './login-form';

const Login = () => {
  return (
    <Box
      flexGrow={1}
      display="grid"
      gridTemplateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
    >
      <Box
        display={{ base: 'none', lg: 'block' }}
        backgroundImage="url(/images/auth-bg.jpg)"
        backgroundSize="cover"
      ></Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
