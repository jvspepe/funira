import { Link } from 'react-router-dom';
import { Box, Button, Heading } from '@chakra-ui/react';
import { TProduct } from '@/@types/product';
import ProductCard from '@/components/ProductCard';

type Props = {
  title?: string;
  products: TProduct[];
  link?: string;
};

const ProductDisplay = ({ title, products, link }: Props) => {
  return (
    <Box
      display="grid"
      gap={{ base: '1rem', sm: '2rem' }}
    >
      {title && (
        <Heading
          as="h3"
          fontWeight="normal"
          fontSize={{ base: '1.25rem', md: '2rem' }}
        >
          {title}
        </Heading>
      )}
      <Box
        display="grid"
        gap={{ base: '1rem 1.25rem', md: '1.25rem' }}
        gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gridAutoRows="1fr"
      >
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
          />
        ))}
      </Box>
      {link && (
        <Button
          asChild
          variant="solid"
          justifySelf="center"
        >
          <Link to={link}>Ver mais</Link>
        </Button>
      )}
    </Box>
  );
};

export default ProductDisplay;
