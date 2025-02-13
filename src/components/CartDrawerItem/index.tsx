import { useState } from 'react';
import {
  Box,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { XIcon } from 'lucide-react';
import { TCartProduct } from '@/@types/product';
import { useAppDispatch } from '@/store/store';
import { removeFromCart } from '@/store/cartSlice';

type Props = {
  product: TCartProduct;
};

const CartDrawerItem = ({ product }: Props) => {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.quantity
  );

  const dispatch = useAppDispatch();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap="0.75rem"
    >
      <Image src={product.images[0]} />
      <Box
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          flexGrow="1"
          gap="0.25rem"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="0.25rem"
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
            onClick={() => dispatch(removeFromCart(product.uid))}
            aria-label="Remover do carrinho"
            type="button"
            size="xs"
            icon={<XIcon />}
          />
        </Box>
        <NumberInput
          defaultValue={productQuantity}
          onChange={(_, value) => setProductQuantity(value)}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Box>
  );
};

export default CartDrawerItem;
