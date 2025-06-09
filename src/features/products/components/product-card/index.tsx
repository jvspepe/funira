import { useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { paths } from '@/config/paths';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { t, i18n } = useTranslation();

  return (
    <Flex
      asChild
      direction="column"
      gap="{spacing.2}"
    >
      <Link to={paths.user.product.replace(':id', product.id)}>
        <Skeleton
          display={imageLoaded ? 'none' : 'block'}
          aspectRatio="portrait"
          borderRadius="{radii.l2}"
        />
        <Image
          src={product.imageCover}
          alt={`Product image for ${
            product.name[i18n.resolvedLanguage as 'en' | 'pt']
          }`}
          display={imageLoaded ? 'block' : 'none'}
          aspectRatio="portrait"
          overflowClipMargin="unset"
          borderRadius="{radii.l2}"
          transition="scale 100ms ease-in-out"
          _hover={{
            scale: '1.025',
          }}
          onLoad={() => setImageLoaded(true)}
        />

        <Flex
          direction="column"
          grow="1"
          gap="{spacing.2}"
          maxWidth="full"
        >
          <Heading
            size="xl"
            fontWeight="normal"
            flexGrow="1"
            lineClamp="1"
          >
            {product.name[i18n.resolvedLanguage as 'en' | 'pt']}
          </Heading>
          <Text color="purple.950">
            {t('products.details.price-amount', {
              amount: product.price,
            })}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
