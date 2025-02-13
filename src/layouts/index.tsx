import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  hideHeader?: boolean;
  hideFooter?: boolean;
};

const Layout = ({ hideHeader = false, hideFooter = false }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100dvh"
    >
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </Box>
  );
};

export default Layout;
