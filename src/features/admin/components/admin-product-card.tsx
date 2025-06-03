import { Product } from '@/@types/models';
import { Badge, Box, Button, Card, HStack, Image } from '@chakra-ui/react';

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
          <Card.Description>{product.summary.pt}</Card.Description>
          <HStack mt="4">
            <Badge>{product.id}</Badge>
            <Badge>{product.category.label.pt}</Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button type="button">Ver produto</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
