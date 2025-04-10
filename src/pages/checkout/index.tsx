import { Box, Container, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';
import CheckoutTotal from './checkout-total';
import CheckoutDisplay from './checkout-display';

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.cartReducer);

  return (
    <Container
      display="flex"
      minHeight="calc(100vh - 5.5rem)"
      paddingY="{spacing.6}"
    >
      <Box
        display="flex"
        gap="{spacing.6}"
        flexGrow="1"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="{spacing.6}"
          flexGrow="1"
          overflowY="auto"
        >
          <Text
            as="h2"
            fontSize="1.5rem"
          >
            Meu carrinho
          </Text>
          {cart.length !== 0 ? (
            <CheckoutDisplay />
          ) : (
            <Text
              as="h2"
              fontSize="1.5rem"
            >
              O Carrinho está vázio...
            </Text>
          )}
        </Box>
        <CheckoutTotal />
      </Box>
    </Container>
  );
};

export default Checkout;
