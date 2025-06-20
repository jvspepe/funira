import { Outlet } from 'react-router';
import { Flex } from '@chakra-ui/react';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

interface Props {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function MainLayout({ hideHeader = false, hideFooter = false }: Props) {
  return (
    <Flex
      direction="column"
      minHeight="100dvh"
    >
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </Flex>
  );
}
