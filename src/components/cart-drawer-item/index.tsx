import { useEffect, useState } from 'react';
import { Box, IconButton, Image, Text } from '@chakra-ui/react';
import { XIcon } from 'lucide-react';
import type { CartProduct } from '@/@types/models';
import { useAppDispatch } from '@/store/store';
import { changeQuantity, removeFromCart } from '@/store/cartSlice';
import NumberStepper from '@/components/ui/number-stepper';

type Props = {
  product: CartProduct;
};

const CartDrawerItem = ({ product }: Props) => {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.quantity
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeQuantity({ uid: product.id, quantity: productQuantity }));
  }, [productQuantity, dispatch, product.id]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap="{spacing.4}"
    >
      <Image src={product.imageCover} />
      <Box
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          flexGrow="1"
          gap="{spacing.2}"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="{spacing.2}"
          >
            <Text fontSize={{ base: '0.75rem', md: '1rem' }}>
              {product.name}
            </Text>
            <Text fontSize={{ base: '0.75rem', md: '1rem' }}>
              {Intl.NumberFormat('pt-br', {
                currency: 'BRL',
                style: 'currency',
              }).format(product.price)}
            </Text>
          </Box>
          <IconButton
            onClick={() => dispatch(removeFromCart(product.id))}
            aria-label="Remover do carrinho"
            type="button"
            size="xs"
          >
            <XIcon />
          </IconButton>
        </Box>
        <NumberStepper
          value={productQuantity}
          setValue={setProductQuantity}
          minValue={1}
        />
      </Box>
    </Box>
  );
};

export default CartDrawerItem;
