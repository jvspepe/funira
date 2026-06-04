import { Separator, Stack } from "@chakra-ui/react";

import { useAppSelector } from "@/store/store";

import CheckoutItem from "./checkout-item";

const CheckoutDisplay = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);
  return (
    <Stack
      separator={<Separator />}
      gap="{spacing.6}"
      paddingInlineEnd={"{spacing.6}"}
    >
      {cart.map((item) => (
        <CheckoutItem key={item.id} product={item} />
      ))}
    </Stack>
  );
};

export default CheckoutDisplay;
