import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Feature from '@/@types/feature';

type Props = {
  feature: Feature;
};

export function FeatureCard({ feature }: Props) {
  return (
    <Flex
      height="100%"
      direction="column"
      gap="{spacing.6}"
      padding="{spacing.6}"
      bgColor="bg.muted"
      borderRadius="{radii.l2}"
    >
      <Icon
        as={feature.icon}
        height="1.5rem"
        width="1.5rem"
      />
      <Heading
        as="h3"
        size="xl"
        fontWeight="normal"
      >
        {feature.title}
      </Heading>
      <Text>{feature.details}</Text>
    </Flex>
  );
}
