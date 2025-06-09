import { Link } from 'react-router';
import {
  Button,
  CloseButton,
  Drawer,
  Icon,
  IconButton,
  Portal,
  Separator,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ShoppingCartIcon } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import CartDrawerItem from '@/components/cart-drawer-item';
import { useTranslation } from 'react-i18next';
import { paths } from '@/config/paths';

export function CartDrawer() {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const { onOpen } = useDisclosure();

  const { t } = useTranslation();

  return (
    <>
      <Drawer.Root size={{ base: 'full', md: 'md' }}>
        <Drawer.Trigger asChild>
          <IconButton
            onClick={onOpen}
            aria-label={t('cart.state.open')}
            type="button"
            variant="ghost"
            size="lg"
          >
            <Icon>
              <ShoppingCartIcon aria-hidden />
            </Icon>
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="lg" />
              </Drawer.CloseTrigger>
              <Drawer.Header>
                <Drawer.Title>{t('cart.heading')}</Drawer.Title>
              </Drawer.Header>
              <Separator />

              <Drawer.Body paddingBlock="{spacing.6}">
                <Stack
                  separator={<Separator />}
                  gap="{spacing.6}"
                >
                  {cart.length >= 1 ? (
                    cart.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        product={item}
                      />
                    ))
                  ) : (
                    <Text>{t('cart.state.empty')}</Text>
                  )}
                </Stack>
              </Drawer.Body>
              <Separator />
              <Drawer.Footer padding="{spacing.6}">
                <Button asChild>
                  <Link to={paths.user.cart}>{t('cart.links.checkout')}</Link>
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
