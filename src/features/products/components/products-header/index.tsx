import { Flex, Heading } from '@chakra-ui/react';

export function ProductsHeader() {
  return (
    <Flex
      align="center"
      justify="center"
      padding="4rem 0"
      backgroundImage='url("/images/product-header.jpg")'
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Heading
        fontSize="2.25rem"
        fontWeight="normal"
        color="white"
      >
        Nossos produtos
      </Heading>
    </Flex>
  );
}
