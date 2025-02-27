import { Link } from 'react-router-dom';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { TProduct } from '@/@types/product';

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Box
      as={Link}
      to={`/produtos/${product.uid}`}
      display="flex"
      flexDirection="column"
      gap="1.5rem"
    >
      <Image
        src={product.images[0]}
        alt=""
      />
      <Box
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        <Heading
          fontSize={{ base: '1.125rem', lg: '1.25rem' }}
          fontWeight="normal"
        >
          {product.name}
        </Heading>
        <Text fontSize={{ base: '0.875rem', lg: '1.125rem' }}>
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(product.price)}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
