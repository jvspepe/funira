import { Link } from 'react-router-dom';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { TProduct } from '@/@types/product';
import ProductCard from '@/components/ProductCard';

type Props = {
  title?: string;
  products: TProduct[];
  link?: string;
};

const ProductDisplay = ({ title, products, link }: Props) => {
  return (
    <Container
      maxW={{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1440px',
      }}
      p={0}
    >
      <Box
        display="grid"
        gap={{ base: '1rem', sm: '2rem' }}
        p={{ base: '1rem 1.5rem', sm: '1rem 0' }}
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
            as={Link}
            to={link}
            variant="solid"
            justifySelf="center"
          >
            Ver mais
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ProductDisplay;
