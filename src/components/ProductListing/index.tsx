import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Separator,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch } from '@/store/store';
import { addToCart } from '@/store/cartSlice';
import { TProduct } from '@/@types/product';
import Stepper from '@/components/ui/Stepper';

type Props = { product: TProduct };

const ProductListing = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: TProduct) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <Box backgroundColor="#F5F5F5">
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        }}
        display="grid"
        gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }}
        gap={{ lg: '2rem' }}
        padding={{ base: '0', lg: '2rem 0' }}
        height={{ lg: 'calc(100dvh - 5.25rem)' }}
      >
        <Image
          src={product.images[0]}
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
            <Stepper
              value={quantity}
              setValue={setQuantity}
              minValue={1}
              label="Quantidade"
            />
            <Button
              onClick={() => handleAddToCart(product)}
              type="button"
            >
              Adicionar ao carrinho
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductListing;
