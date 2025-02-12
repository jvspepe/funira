import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '', lg: 'repeat(2, 1fr)' }}
      height="100dvh"
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
