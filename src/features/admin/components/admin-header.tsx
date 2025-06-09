import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import { signOut } from '@/features/users/services';
import { useAuth } from '@/features/users/hooks/use-auth';

export function AdminHeader() {
  const { currentUserData } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexGrow="1"
      padding="{spacing.5}"
      borderBlockEnd="{borders.sm}"
      borderBlockEndColor="border"
    >
      <IconButton variant="ghost">
        <Icon>
          <MenuIcon />
        </Icon>
      </IconButton>
      <Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              type="button"
              variant="ghost"
              paddingBlock="1.5rem"
              paddingInline="0.75rem"
            >
              <Box textAlign="end">
                <Text>{currentUserData?.username}</Text>
                <Text>{currentUserData?.role}</Text>
              </Box>
              <Avatar.Root>
                <Avatar.Fallback name={currentUserData?.username} />
              </Avatar.Root>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  onClick={handleSignOut}
                  value="sign-out"
                >
                  <Icon size="sm">
                    <LogOutIcon />
                  </Icon>
                  <Text>Sair</Text>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Box>
  );
}
