import { Link } from 'react-router';
import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react';
import { CircleUserIcon } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { signOut } from '@/features/auth/services';

export function UserMenu() {
  const { currentUserData } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="ghost"
          size="lg"
        >
          <Icon>
            <CircleUserIcon />
          </Icon>
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {!currentUserData ? (
              <>
                <Menu.Item
                  value="sign-in"
                  asChild
                >
                  <Link to="/sign-in">Conectar</Link>
                </Menu.Item>
                <Menu.Item
                  value="sign-up"
                  asChild
                >
                  <Link to="/sign-up">Criar conta</Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                onClick={handleSignOut}
                value="sign-out"
              >
                Sair
              </Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
