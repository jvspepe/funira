import type { ReactNode } from "react";

import { Card, Heading, Icon } from "@chakra-ui/react";

export interface Feature {
  description: string;
  heading: string;
  icon: ReactNode;
}

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card.Root variant="subtle">
      <Card.Header flexDirection="column" gap="4">
        <Icon aria-hidden>{feature.icon}</Icon>
        <Heading fontWeight="normal">{feature.heading}</Heading>
      </Card.Header>
      <Card.Body>{feature.description}</Card.Body>
    </Card.Root>
  );
}
