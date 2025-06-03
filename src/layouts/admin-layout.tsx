import { Outlet } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';
import { AdminHeader } from '@/features/admin/components/admin-header';
import { AdminSidebar } from '@/features/admin/components/admin-sidebar';

export function AdminLayout() {
  return (
    <Flex minHeight="100dvh">
      <AdminSidebar />
      <Box flexGrow="1">
        <AdminHeader />
        <Box padding="{spacing.5}">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
