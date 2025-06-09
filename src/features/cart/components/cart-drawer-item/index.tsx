import { useEffect, useState } from 'react';
import { Flex, Grid, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { TrashIcon } from 'lucide-react';
import { type CartProduct } from '@/@types/models';
import { useAppDispatch } from '@/store/store';
import { changeQuantity, removeFromCart } from '@/store/cartSlice';
import { NumberStepper } from '@/components/ui/number-stepper';
import { useTranslation } from 'react-i18next';

interface CartDrawerItemProps {
  product: CartProduct;
}

const CartDrawerItem = ({ product }: CartDrawerItemProps) => {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.quantity
  );

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(changeQuantity({ uid: product.id, quantity: productQuantity }));
  }, [productQuantity, dispatch, product.id]);

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="{spacing.4}"
    >
      <Image
        src={product.imageCover}
        alt={`${product.name[i18n.resolvedLanguage as 'en' | 'pt']}`}
        borderRadius="{radii.l2}"
      />
      <Flex direction="column">
        <Flex
          align="start"
          justify="space-between"
          grow="1"
          gap="{spacing.2}"
        >
          <Flex
            direction="column"
            gap="{spacing.2}"
          >
            <Text textStyle={{ base: 'md', md: '1rem' }}>
              {product.name[i18n.resolvedLanguage as 'en' | 'pt']}
            </Text>
            <Text fontSize={{ base: '0.75rem', md: '1rem' }}>
              {Intl.NumberFormat('pt-br', {
                currency: 'BRL',
                style: 'currency',
              }).format(product.price)}
            </Text>
          </Flex>
          <IconButton
            onClick={() => dispatch(removeFromCart(product.id))}
            aria-label={t('cart.buttons.remove')}
            type="button"
            variant="ghost"
            size="xs"
            colorPalette="red"
          >
            <Icon>
              <TrashIcon />
            </Icon>
          </IconButton>
        </Flex>
        <NumberStepper
          value={productQuantity}
          setValue={setProductQuantity}
          minValue={1}
        />
      </Flex>
    </Grid>
  );
};

export default CartDrawerItem;
