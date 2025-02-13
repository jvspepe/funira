import { Link } from 'react-router-dom';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ShoppingCartIcon } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import CartDrawerItem from '@/components/CartDrawerItem';

const CartDrawer = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Abrir carrinho"
        type="button"
        variant="ghost"
        icon={<ShoppingCartIcon />}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xs', md: 'sm' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid #EBE8F4">
            Meu Carrinho
          </DrawerHeader>
          <DrawerBody
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
          </DrawerBody>
          <DrawerFooter borderTop="1px solid #EBE8F4">
            <Button
              as={Link}
              to="/carrinho"
            >
              Ir para o checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
