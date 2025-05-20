import { Link } from 'react-router';
import {
  Button,
  CloseButton,
  Drawer,
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

const CartDrawer = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const { onOpen } = useDisclosure();

  return (
    <>
      <Drawer.Root size={{ base: 'xs', md: 'sm' }}>
        <Drawer.Trigger asChild>
          <IconButton
            onClick={onOpen}
            aria-label="Abrir carrinho"
            type="button"
            variant="ghost"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Header borderBottom="{borders.sm} #EBE8F4">
                <Drawer.Title>Meu Carrinho</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body paddingBlock="{spacing.6}">
                <Stack
                  separator={<Separator />}
                  gap="{spacing.6}"
                >
                  {cart.length >= 1 ? (
                    cart.map((item) => (
                      <CartDrawerItem
                        key={item.uid}
                        product={item}
                      />
                    ))
                  ) : (
                    <Text>Carrinho vazio</Text>
                  )}
                </Stack>
              </Drawer.Body>
              <Drawer.Footer
                padding="{spacing.6}"
                borderTop="1px solid #EBE8F4"
              >
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
};

export default CartDrawer;
