import { Box, Heading } from '@chakra-ui/react';

const ProductsHeader = () => {
  return (
    <Box
      backgroundImage='url("/images/product-header.jpg")'
      backgroundSize="cover"
      backgroundPosition="center"
      padding="4rem 0"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        fontSize="2.25rem"
        fontWeight="normal"
        color="white"
      >
        Nossos produtos
      </Heading>
    </Box>
  );
};

export default ProductsHeader;
