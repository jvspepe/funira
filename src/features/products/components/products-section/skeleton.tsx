/* eslint-disable react-x/no-array-index-key */
import { Button, Grid, Heading, Skeleton } from '@chakra-ui/react';
import { ProductCardSkeleton } from '../product-card/skeleton';

interface ProductsSectionSkeletonProps {
  title?: boolean;
  length?: number;
  link?: boolean;
}

export function ProductsSectionSkeleton({
  title = true,
  length = 4,
  link = true,
}: ProductsSectionSkeletonProps) {
  return (
    <Grid gap="{spacing.8}">
      <Grid gap={{ base: '{spacing.4}', md: '{spacing.6}' }}>
        {title && (
          <Skeleton width="fit-content">
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              fontWeight="normal"
            >
              Product section title
            </Heading>
          </Skeleton>
        )}
        <Grid
          gap="{spacing.6}"
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          autoRows="1fr"
        >
          {Array.from({ length }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </Grid>
      </Grid>
      {link && (
        <Skeleton
          width={{ base: 'full', md: 'fit-content' }}
          justifySelf="center"
        >
          <Button size="lg">Link</Button>
        </Skeleton>
      )}
    </Grid>
  );
}
