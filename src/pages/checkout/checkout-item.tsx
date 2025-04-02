import { useEffect, useState } from 'react';
import { Box, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { XIcon } from 'lucide-react';
import { TCartProduct } from '@/@types/product';
import { changeQuantity } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/store';
import NumberStepper from '@/components/ui/number-stepper';

type Props = {
  product: TCartProduct;
};

const CheckoutItem = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeQuantity({ uid: product.uid, quantity: value }));
  }, [value, dispatch, product.uid]);

  return (
    <Box
      display="flex"
      gap="0.625rem"
    >
      <Image
        src={product.images[0]}
        maxWidth={{ base: '10rem', sm: '15rem' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="0.625rem"
        width="100%"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="0.25rem"
          >
            <Heading
              as="h2"
              fontSize="1rem"
              fontWeight="normal"
            >
              {product.name}
            </Heading>
            <Text>
              {Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              }).format(product.price)}
            </Text>
          </Box>
          <IconButton
            type="button"
            size="xs"
            _hover={{
              colorPalette: 'red',
            }}
          >
            <XIcon />
          </IconButton>
        </Box>
        <NumberStepper
          label="Quantidade"
          value={value}
          setValue={setValue}
          minValue={1}
          // onValueDecrease={() => dispatch(decreaseQuantity(product.uid))}
          // onValueIncrease={() => dispatch(increaseQuantity(product.uid))}
        />
      </Box>
    </Box>
  );
};

export default CheckoutItem;
