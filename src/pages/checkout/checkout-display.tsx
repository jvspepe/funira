import { Separator, Stack } from '@chakra-ui/react';
import CheckoutItem from './checkout-item';
import { useAppSelector } from '@/store/store';

const CheckoutDisplay = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);
  return (
    <Stack
      separator={<Separator />}
      gap="{spacing.6}"
      paddingInlineEnd={'{spacing.6}'}
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
