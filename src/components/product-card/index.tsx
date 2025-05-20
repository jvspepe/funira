import { Link as RouterLink } from 'react-router';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import type { Product } from '@/@types/models';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      gap="{spacing.2}"
    >
      <RouterLink to={`/produtos/${product.id}`}>
        <Image
          src={product.imageCover}
          alt=""
        />
        <Box
          display="flex"
          flexDirection="column"
        >
          <Heading
            as="h3"
            fontSize={{ base: '{fontSizes.md}', md: '{fontSizes.xl}' }}
            fontWeight="normal"
          >
            {product.name}
          </Heading>
          <Text color="fg.muted">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(product.price)}
          </Text>
        </Box>
      </RouterLink>
    </Box>
  );
};

export default ProductCard;
