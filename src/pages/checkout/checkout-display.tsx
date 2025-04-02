import { Separator, Stack } from '@chakra-ui/react';
import CheckoutItem from './checkout-item';
import { useAppSelector } from '@/store/store';

const CheckoutDisplay = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);
  return (
    <Stack
      separator={<Separator />}
      gap="1.25rem"
      paddingInlineEnd={'1.25rem'}
    >
      {cart.map((item) => (
        <CheckoutItem
          key={item.uid}
          product={item}
        />
      ))}
    </Stack>
  );
};

export default CheckoutDisplay;
