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

export function CartDrawer() {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const { onOpen } = useDisclosure();

  return (
    <>
      <Drawer.Root size={{ base: 'full', md: 'md' }}>
        <Drawer.Trigger asChild>
          <IconButton
            onClick={onOpen}
            aria-label="Abrir carrinho"
            type="button"
            variant="ghost"
            size="lg"
          >
            <Icon>
              <ShoppingCartIcon />
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
                <Drawer.Title>Meu Carrinho</Drawer.Title>
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
                    <Text>Carrinho vazio</Text>
                  )}
                </Stack>
              </Drawer.Body>
              <Separator />
              <Drawer.Footer padding="{spacing.6}">
                <Button asChild>
                  <Link to="/carrinho">Ir para o checkout</Link>
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
