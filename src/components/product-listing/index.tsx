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
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { PackageCheckIcon } from 'lucide-react';
import { useAppDispatch } from '@/store/store';
import { addToCart } from '@/store/cartSlice';
import type { Product } from '@/@types/models';
import NumberStepper from '@/components/ui/number-stepper';

const STATUS_DURATION = 2000;

type Props = { product: Product };

const ProductListing = ({ product }: Props) => {
  const [buttonStatus, setButtonStatus] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

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
    <Box backgroundColor="#F5F5F5">
      <Container
        display="grid"
        gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }}
        gap={{ lg: '1.5rem' }}
        paddingY={{ base: '0', lg: '1.5rem' }}
        // height={{ lg: 'calc(100dvh - 5.5rem)' }}
      >
        <Image
          src={product.imageCover}
          alt=""
          objectFit="cover"
          width="full"
          height="full"
        />
        <Box
          display="flex"
          flexDirection="column"
          gap="1.5rem"
          backgroundColor="white"
          padding={{ base: '1.5rem', sm: '1.5rem 0', md: '2.5rem' }}
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Heading
              as="h1"
              fontSize={{ base: '1.5rem', xl: '2.25rem' }}
              fontWeight="normal"
            >
              {product.name}
            </Heading>
            <Text
              as="span"
              fontSize={{ base: '1.25rem', xl: '1.5rem' }}
            >
              {Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              }).format(product.price)}
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="0.75rem"
          >
            <Heading
              as="h2"
              fontSize="1.25rem"
              fontWeight="normal"
            >
              Descrição
            </Heading>
            <Text>{product.description}</Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="0.75rem"
            flexGrow={{ lg: '1' }}
          >
            <Heading
              as="h3"
              fontSize="1.25rem"
              fontWeight="normal"
            >
              Dimensões
            </Heading>
            <Box
              display="flex"
              justifyContent="space-between"
              gap="1rem"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                textAlign="start"
              >
                <Heading
                  fontSize="1rem"
                  fontWeight="normal"
                >
                  Altura
                </Heading>
                <Text fontSize={{ base: '0.875rem', lg: '1rem' }}>
                  {product.dimensions?.height}cm
                </Text>
              </Box>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                textAlign="center"
              >
                <Heading
                  fontSize="1rem"
                  fontWeight="normal"
                >
                  Largura
                </Heading>
                <Text fontSize={{ base: '0.875rem', lg: '1rem' }}>
                  {product.dimensions?.width}cm
                </Text>
              </Box>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                textAlign="end"
              >
                <Heading
                  fontSize="1rem"
                  fontWeight="normal"
                >
                  Comprimento
                </Heading>
                <Text fontSize={{ base: '0.875rem', lg: '1rem' }}>
                  {product.dimensions?.depth}cm
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ lg: 'end' }}
            justifyContent={{ lg: 'space-between' }}
            gap="1rem"
          >
            <NumberStepper
              value={quantity}
              setValue={(value) => setQuantity(value)}
              minValue={1}
            />
            <Button
              onClick={() => handleAddToCart(product)}
              type="button"
              colorPalette={buttonStatus === 'success' ? 'green' : undefined}
            >
              <Icon size="sm">
                <PackageCheckIcon />
              </Icon>
              <Box as="span">Adicionar ao carrinho</Box>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductListing;
