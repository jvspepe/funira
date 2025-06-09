import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Heading, Text } from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { ProductCard } from '@/features/products/components/product-card';

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
  const { t } = useTranslation();

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
            (products.length === 0 && (
              <Text>{t('products.not-found_other')}</Text>
            ))}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
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
          <Link to={link}>{t('products.actions.see-more')}</Link>
        </Button>
      )}
    </Grid>
  );
}
