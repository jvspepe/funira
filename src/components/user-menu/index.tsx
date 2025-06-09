import { Link } from 'react-router';
import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react';
import { CircleUserIcon } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { signOut } from '@/features/auth/services';
import { useTranslation } from 'react-i18next';
import { paths } from '@/config/paths';

export function UserMenu() {
  const { currentUserData } = useAuth();

  const { t } = useTranslation();

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
                  <Link to={paths.user.signIn}>
                    {t('common:buttons.sign-in')}
                  </Link>
                </Menu.Item>
                <Menu.Item
                  value="sign-up"
                  asChild
                >
                  <Link to={paths.user.signUp}>
                    {t('common:buttons.sign-up')}
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                onClick={handleSignOut}
                value="sign-out"
              >
                {t('common:buttons.sign-out')}
              </Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
