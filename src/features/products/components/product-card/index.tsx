import { Link } from 'react-router';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { paths } from '@/config/paths';
import { useTranslation } from 'react-i18next';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { i18n } = useTranslation();

  return (
    <Flex
      asChild
      direction="column"
      gap="{spacing.2}"
    >
      <Link to={paths.user.product.replace(':id', product.id)}>
        <Image
          src={product.imageCover}
          alt={`Product image for ${
            product.name[i18n.resolvedLanguage as 'en' | 'pt']
          }`}
          aspectRatio="portrait"
          borderRadius="{radii.l2}"
          transition="scale 100ms ease-in-out"
          _hover={{
            scale: '1.025',
          }}
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
            {Intl.NumberFormat(
              i18n.resolvedLanguage === 'pt' ? 'pt-BR' : 'en-US',
              {
                currency: i18n.resolvedLanguage === 'pt' ? 'BRL' : 'USD',
                style: 'currency',
              }
            ).format(product.price)}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
