import { useState } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { TCartProduct } from '@/@types/product';
import Stepper from '@/components/ui/Stepper';

type Props = {
  product: TCartProduct;
};

const CartProduct = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);

  return (
    <Box
      display="flex"
      gap="1.5rem"
    >
      <Image
        src={product.images[0]}
        alt=""
        maxWidth="7.5rem"
        objectFit="cover"
      />
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        gap="1rem"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
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
        <Stepper
          value={value}
          setValue={setValue}
        />
        <Text display={{ base: 'none', xl: 'block' }}>
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(product.price)}
        </Text>
      </Box>
    </Box>
  );
};

export default CartProduct;
