import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Separator,
  Heading,
  Image,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { ShoppingCartIcon } from 'lucide-react';
import { type Product } from '@/@types/models';
import { toaster } from '@/components/ui/toaster';
import { addToCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/store';
import { NumberStepper } from '@/components/ui/number-stepper';
import { useTranslation } from 'react-i18next';

const STATUS_DURATION = 2000;

interface ProductListingProps {
  product: Product;
}

export function ProductListing({ product }: ProductListingProps) {
  const [buttonStatus, setButtonStatus] = useState('');
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const resolvedLanguage = i18n.resolvedLanguage as 'en' | 'pt';

  const handleAddToCart = (product: Product) => {
    setButtonStatus('success');

    dispatch(addToCart({ ...product, quantity }));

    toaster.create({
      title: 'Produto adicionado ao carrinho',
      type: 'success',
      duration: STATUS_DURATION,
    });

    setTimeout(() => {
      setButtonStatus('');
    }, STATUS_DURATION);
  };

  return (
    <Box backgroundColor="bg.muted">
      <Container
        display="grid"
        gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }}
        gap={{ lg: '{spacing.6}' }}
        paddingBlock={{ lg: '{spacing.12}' }}
        paddingInline={{ base: '0' }}
        minHeight="calc(100dvh - {sizes.22})"
      >
        <Image
          src={product.imageCover}
          alt=""
          objectFit="cover"
          width="full"
          height="full"
          borderRadius="{radii.l2}"
        />
        <Flex
          direction="column"
          gap="{spacing.6}"
          padding={{
            base: '{spacing.6}',
            sm: '{spacing.6} 0',
            md: '{spacing.10}',
          }}
          borderRadius="{radii.l2}"
          backgroundColor="bg.panel"
        >
          <Flex
            direction="column"
            gap="{spacing.4}"
          >
            <Heading
              as="h1"
              size={{ base: '2xl', xl: '4xl' }}
              fontWeight="normal"
            >
              {product.name[resolvedLanguage]}
            </Heading>
            <Text
              as="span"
              textStyle="xl"
              color="fg.muted"
            >
              {Intl.NumberFormat(
                resolvedLanguage === 'pt' ? 'pt-BR' : 'en-US',
                {
                  currency: resolvedLanguage === 'pt' ? 'BRL' : 'USD',
                  style: 'currency',
                }
              ).format(product.price)}
            </Text>
          </Flex>
          <Flex
            direction="column"
            gap="{spacing.4}"
          >
            <Heading
              as="h2"
              size="md"
              fontWeight="normal"
            >
              {t('products.details.description')}
            </Heading>
            <Text
              textStyle={{ base: 'sm', md: 'md' }}
              color="fg.muted"
            >
              {product.description?.[resolvedLanguage] ?? ''}
            </Text>
          </Flex>
          <Flex
            direction="column"
            grow={{ lg: '1' }}
            gap="{spacing.4}"
          >
            <Heading
              as="h3"
              size="md"
              fontWeight="normal"
            >
              {t('products.details.dimensions')}
            </Heading>
            <Flex
              justify="space-between"
              gap="1rem"
              color="fg.muted"
            >
              <Flex
                direction="column"
                gap="{spacing.4}"
                textAlign="start"
              >
                <Heading
                  size={{ base: 'sm', md: 'md' }}
                  fontWeight="normal"
                >
                  {t('products.details.height')}
                </Heading>
                <Text textStyle={{ base: 'xs', md: 'sm' }}>
                  {product.dimensions?.height}cm
                </Text>
              </Flex>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Flex
                direction="column"
                gap="{spacing.4}"
                textAlign="center"
              >
                <Heading
                  size={{ base: 'sm', md: 'md' }}
                  fontWeight="normal"
                >
                  {t('products.details.width')}
                </Heading>
                <Text textStyle={{ base: 'xs', md: 'sm' }}>
                  {product.dimensions?.width}cm
                </Text>
              </Flex>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Box
                display="flex"
                flexDirection="column"
                gap="{spacing.4}"
                textAlign="end"
              >
                <Heading
                  size={{ base: 'sm', md: 'md' }}
                  fontWeight="normal"
                >
                  {t('products.details.depth')}
                </Heading>
                <Text textStyle={{ base: 'xs', md: 'sm' }}>
                  {product.dimensions?.depth}cm
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'end' }}
            justify={{ lg: 'space-between' }}
            gap="1rem"
          >
            <NumberStepper
              label={t('cart.quantity')}
              value={quantity}
              setValue={(value) => setQuantity(value)}
              minValue={1}
            />
            <Button
              onClick={() => handleAddToCart(product)}
              type="button"
              size="lg"
              colorPalette={buttonStatus === 'success' ? 'green' : undefined}
            >
              <Icon size="sm">
                <ShoppingCartIcon />
              </Icon>
              <Box as="span">{t('cart.buttons.add')}</Box>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
