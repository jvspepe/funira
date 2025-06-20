import { useEffect, useState } from 'react';
import { Box, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { XIcon } from 'lucide-react';
import { CartProduct } from '@/@types/models';
import { changeQuantity } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/store';
import { NumberStepper } from '@/components/ui/number-stepper';
import { useTranslation } from 'react-i18next';

type Props = {
  product: CartProduct;
};

const CheckoutItem = ({ product }: Props) => {
  const [value, setValue] = useState(product.quantity);

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(changeQuantity({ uid: product.id, quantity: value }));
  }, [value, dispatch, product.id]);

  return (
    <Box
      display="flex"
      gap="{spacing.2}"
    >
      <Image
        src={product.imageCover}
        maxWidth={{ base: '10rem', sm: '15rem' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="{spacing.2}"
        width="100%"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="{spacing.2}"
          >
            <Heading
              as="h2"
              fontSize="1rem"
              fontWeight="normal"
            >
              {product.name[i18n.resolvedLanguage as 'en' | 'pt']}
            </Heading>
            <Text>
              {Intl.NumberFormat(
                i18n.resolvedLanguage === 'pt' ? 'pt-BR' : 'en-US',
                {
                  currency: i18n.resolvedLanguage === 'pt' ? 'BRL' : 'USD',
                  style: 'currency',
                }
              ).format(product.price)}
            </Text>
          </Box>
          <IconButton
            type="button"
            size="xs"
            _hover={{
              colorPalette: 'red',
            }}
          >
            <XIcon />
          </IconButton>
        </Box>
        <NumberStepper
          label={t('cart.quantity')}
          value={value}
          setValue={setValue}
          minValue={1}
        />
      </Box>
    </Box>
  );
};

export default CheckoutItem;
