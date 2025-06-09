import { Box, Container, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';
import CheckoutTotal from './checkout-total';
import CheckoutDisplay from './checkout-display';
import { useTranslation } from 'react-i18next';

export function Checkout() {
  const { cart } = useAppSelector((state) => state.cartReducer);

  const { t } = useTranslation();

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
            {t('cart.heading')}
          </Text>
          {cart.length !== 0 ? (
            <CheckoutDisplay />
          ) : (
            <Text
              as="h2"
              fontSize="1.5rem"
            >
              {t('cart.state.empty')}
            </Text>
          )}
        </Box>
        <CheckoutTotal />
      </Box>
    </Container>
  );
}
