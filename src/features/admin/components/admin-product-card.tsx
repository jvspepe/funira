import { Link } from 'react-router';
import { Badge, Box, Button, Card, HStack, Image } from '@chakra-ui/react';
import { type Product } from '@/@types/models';
import { paths } from '@/config/paths';

type AdminProductCardProps = {
  product: Product;
};

export function AdminProductCard({ product }: AdminProductCardProps) {
  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      size="sm"
    >
      <Image
        objectFit="cover"
        aspectRatio="portrait"
        maxWidth="12.5rem"
        src={product.imageCover}
      />
      <Box>
        <Card.Body>
          <Card.Title mb="2">{product.name.pt}</Card.Title>
          <Card.Description>{product.id}</Card.Description>
          <HStack mt="4">
            <Badge>{product.category.label.pt}</Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button type="button">Ver produto</Button>
          <Button asChild>
            <Link
              to={paths.admin.editProduct.replace(':productId', product.id)}
            >
              Editar produto
            </Link>
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
