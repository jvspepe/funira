import Footer from '@/components/section/footer';
import Header from '@/components/section/header';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

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
