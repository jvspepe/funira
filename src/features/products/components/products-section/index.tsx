import { Link } from 'react-router';
import { Button, Grid, Heading, Text } from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { ProductCard } from '@/features/products/components/product-card';
import { ProductCardSkeleton } from '../product-card/skeleton';
import { Suspense } from 'react';

interface ProductsSectionProps {
  title?: string;
  products: Product[];
  link?: string;
}

export function ProductsSection({
  title,
  products,
  link,
}: ProductsSectionProps) {
  return (
    <Grid gap="{spacing.8}">
      <Grid gap={{ base: '{spacing.4}', md: '{spacing.6}' }}>
        {title && (
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            fontWeight="normal"
          >
            {title}
          </Heading>
        )}
        <Grid
          gap="{spacing.6}"
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          autoRows="1fr"
        >
          {!products ||
            (products.length === 0 && <Text>Nenhum produto encontrado</Text>)}
          {products.map((product) => (
            <Suspense
              key={product.id}
              fallback={<ProductCardSkeleton />}
            >
              <ProductCard product={product} />
            </Suspense>
          ))}
        </Grid>
      </Grid>
      {link && (
        <Button
          asChild
          size="lg"
          justifySelf="center"
          width={{ base: 'full', md: 'fit-content' }}
        >
          <Link to={link}>Ver mais</Link>
        </Button>
      )}
    </Grid>
  );
}
