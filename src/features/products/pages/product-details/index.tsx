import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Container, Flex } from '@chakra-ui/react';
import { getProduct } from '@/features/products/services';
import { Contact } from '@/components/sections/contact';
import { Features } from '@/components/sections/features';
import { ProductListing } from '@/features/products/components/product-listing';

export function ProductDetails() {
  const { id } = useParams();

  const productQuery = useQuery({
    enabled: !!id,
    queryKey: ['product', id],
    queryFn: async () => await getProduct(id!),
  });

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.isError) {
    return <div>Algo deu errado</div>;
  }

  if (!productQuery.data) {
    return <div>Nenhum produto encontrado</div>;
  }

  return (
    <Flex
      direction="column"
      gap="{spacing.12}"
    >
      <ProductListing product={productQuery.data} />
      <Container
        display="flex"
        flexDirection="column"
        gap="{spacing.12}"
        paddingBottom="{spacing.12}"
      >
        <Features />
        <Contact />
      </Container>
    </Flex>
  );
}
