import { Flex, Heading, Skeleton, Text } from '@chakra-ui/react';

export function ProductCardSkeleton() {
  return (
    <Flex
      direction="column"
      gap="{spacing.2}"
    >
      <Skeleton
        aspectRatio="portrait"
        borderRadius="{radii.l2}"
      />
      <Flex
        direction="column"
        grow="1"
        gap="{spacing.2}"
        maxWidth="full"
      >
        <Skeleton width="fit-content">
          <Heading
            size="xl"
            fontWeight="normal"
            flexGrow="1"
            lineClamp="1"
          >
            Product Name
          </Heading>
        </Skeleton>
        <Skeleton width="fit-content">
          <Text color="purple.950">Product Price</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
