import { Badge, Button, Card, Link, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';

const CheckoutTotal = () => {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

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
        <Card.Title>Total</Card.Title>
        <Badge variant="surface">{cart.length} items</Badge>
      </Card.Header>
      <Card.Body>
        <Text as="span">
          Preço:{' '}
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(total)}
        </Text>
        <Text as="span">Frete: Grátis</Text>
      </Card.Body>
      <Card.Footer alignSelf="end">
        <Button type="button">Finalizar compra</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default CheckoutTotal;
