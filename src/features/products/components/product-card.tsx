import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

import type { ProductWithDetails } from "../types";

interface ProductCardProps {
  product: ProductWithDetails;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image src={product.images[0].imageUrl} alt="" />
      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(Number.parseFloat(product.price))}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" asChild>
          <Link to="/products/$productId" params={{ productId: product.id }}>
            Buy now
          </Link>
        </Button>
        <Button type="button" variant="ghost">
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
