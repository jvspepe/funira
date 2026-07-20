import {
  Badge,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  NumberInput,
  Text,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";

import { Footer } from "@/components/sections/footer";
import { productDetailsQueryOptions } from "@/features/products/queries";

export const Route = createFileRoute("/(layout)/products/$productId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();

  const { data: product } = useSuspenseQuery(
    productDetailsQueryOptions({ productId })
  );

  console.log(product);

  return (
    <Container>
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap="4">
        <Flex flexDirection="column" gap="4" maxHeight="calc(100svh - 6.5rem)">
          <Image
            src={product.images[0].imageUrl}
            width="100%"
            height="100%"
            aspectRatio={3 / 4}
          />
          <Flex gap="4">
            {product.images.map((image) => (
              <Image
                key={image.id}
                src={image.imageUrl}
                height="100%"
                width="100%"
                aspectRatio={3 / 4}
              />
            ))}
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gap="4"
          padding="4"
          backgroundColor="bg.subtle"
        >
          <Flex flexDirection="column" gap="4" flexGrow="1">
            <Heading size="3xl">{product.name}</Heading>
            <Flex gap="2">
              {product.categories.map((category) => (
                <Badge key={category.category.id} variant="solid">
                  {category.category.name}
                </Badge>
              ))}
            </Flex>
            <Text color="fg.muted">{product.description}</Text>
            <Text>
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(Number.parseFloat(product.price))}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" gap="4">
            <NumberInput.Root defaultValue="3" unstyled spinOnPress={false}>
              <HStack gap="2">
                <NumberInput.DecrementTrigger asChild>
                  <IconButton variant="outline">
                    <Icon size="sm">
                      <MinusIcon />
                    </Icon>
                  </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText
                  textAlign="center"
                  fontSize="lg"
                  minW="3ch"
                />
                <NumberInput.IncrementTrigger asChild>
                  <IconButton variant="outline">
                    <Icon size="sm">
                      <PlusIcon />
                    </Icon>
                  </IconButton>
                </NumberInput.IncrementTrigger>
              </HStack>
            </NumberInput.Root>
            <Button>
              <Icon size="sm">
                <ShoppingCartIcon />
              </Icon>
              Add to Cart
            </Button>
          </Flex>
        </Flex>
      </Grid>
      <Footer />
    </Container>
  );
}
