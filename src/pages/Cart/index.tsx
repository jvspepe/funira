import { Link } from 'react-router-dom';
import { Box, Button, Container, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';
import CartProduct from '@/components/CartProduct';

const Cart = () => {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

  return (
    <Container
      maxW={{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      }}
      padding={{ base: '0', sm: '2rem 0', lg: '4rem 0' }}
      display="flex"
      minHeight="calc(100vh - 5rem)"
      justifyContent={{ sm: 'center' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
        width="100%"
        padding="2rem 1.5rem"
      >
        <Text
          as="h2"
          fontSize="1.5rem"
        >
          Seu carrinho
        </Text>
        <hr style={{ border: `1px solid black` }} />
        {cart.length !== 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            gap="2rem"
            flexGrow="1"
          >
            {cart.map((item) => (
              <CartProduct
                key={item.uid}
                product={item}
              />
            ))}
          </Box>
        ) : (
          <Text
            as="h2"
            fontSize="1.5rem"
          >
            O Carrinho está vázio...
          </Text>
        )}
        <hr
          style={{
            border: `1px solid black`,
            marginTop: 'auto',
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          gap="0.5rem"
          alignSelf="end"
        >
          <Text
            as="span"
            fontSize="1.25rem"
          >
            Total
          </Text>
          <Text
            as="span"
            fontSize="1.25rem"
          >
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(total)}
          </Text>
        </Box>
        <Button asChild>
          <Link to="/">Finalizar compra</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
