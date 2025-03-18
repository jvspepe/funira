import { Link } from 'react-router-dom';
import {
  Button,
  CloseButton,
  Drawer,
  IconButton,
  Portal,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ShoppingCartIcon } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import CartDrawerItem from '@/components/CartDrawerItem';

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
              <Drawer.Header borderBottom="1px solid #EBE8F4">
                <Drawer.Title>Meu Carrinho</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body
                p={'1.25rem'}
                display="flex"
                flexDirection="column"
                gap="1.25rem"
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
              </Drawer.Body>
              <Drawer.Footer borderTop="1px solid #EBE8F4">
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
