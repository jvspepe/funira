import {
  Badge,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { productDetailsQueryOptions } from "@/features/products/queries";

export const Route = createFileRoute(
  "/admin/(admin-layout)/products/$productId/"
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(
      productDetailsQueryOptions({ productId: params.productId })
    );
  },
});

function RouteComponent() {
  const { productId } = Route.useParams();

  const { data: product } = useSuspenseQuery(
    productDetailsQueryOptions({ productId })
  );

  return (
    <Flex direction="column" gap="6" padding="6">
      <Button asChild alignSelf="self-start" variant="outline">
        <Link to="/admin/products">
          <Icon size="sm">
            <ArrowLeftIcon />
          </Icon>
          Back to Products
        </Link>
      </Button>
      {product.images.length > 0 && (
        <Flex direction="column" gap="3">
          <Text color="fg.muted">Images</Text>
          <SimpleGrid columns={{ md: 2 }} gap="4">
            <Image
              src={product.images[0].imageUrl}
              alt={product.images[0].altText ?? product.name}
              height="100%"
            />
            <SimpleGrid columns={{ md: 2 }} gap="4">
              {[...product.images].slice(1).map((image) => (
                <Image
                  key={image.id}
                  src={image.imageUrl}
                  alt={image.altText ?? product.name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              ))}
            </SimpleGrid>
          </SimpleGrid>
        </Flex>
      )}
      <Separator />
      <Flex direction="column" gap="3">
        <Text color="fg.muted">Info</Text>
        <Flex alignItems="start" justifyContent="space-between" gap="2">
          <Flex direction="column" gap="1">
            <Heading size="2xl">{product.name}</Heading>
            <Text color="fg.muted">{product.description}</Text>
          </Flex>
          <Text fontSize="2xl" fontWeight="semibold">
            {Number(product.price).toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            })}
          </Text>
        </Flex>
        {product.categories.length > 0 && (
          <Flex direction="column" gap="3">
            <Text
              color="fg.muted"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              Categories
            </Text>
            <Flex gap="2" flexWrap="wrap">
              {product.categories.map((category) => (
                <Badge key={category.id} variant="solid">
                  {category.category.name}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
        <Flex direction="column" gap="1">
          <Text color="fg.muted" fontSize="sm">
            Created:{" "}
            {new Date(product.createdAt).toLocaleDateString("en", {
              dateStyle: "medium",
            })}
          </Text>
          <Text color="fg.muted" fontSize="sm">
            Last updated:{" "}
            {new Date(product.updatedAt).toLocaleDateString("en", {
              dateStyle: "medium",
            })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
