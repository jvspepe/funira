import { Badge, Button, Card, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';
import { useTranslation } from 'react-i18next';

const CheckoutTotal = () => {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

  const { t, i18n } = useTranslation();

  return (
    <Card.Root
      minWidth="20rem"
      height="fit-content"
    >
      <Card.Header
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Card.Title>{t('cart.total')}</Card.Title>
        <Badge variant="surface">
          {t('cart.state.quantity', { quantity: cart.length })}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Text as="span">
          {t('cart.price')}:{' '}
          {Intl.NumberFormat(
            i18n.resolvedLanguage === 'pt' ? 'pt-BR' : 'en-US',
            {
              currency: i18n.resolvedLanguage === 'pt' ? 'BRL' : 'USD',
              style: 'currency',
            }
          ).format(total)}
        </Text>
      </Card.Body>
      <Card.Footer alignSelf="end">
        <Button type="button">{t('cart.buttons.finish')}</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default CheckoutTotal;
