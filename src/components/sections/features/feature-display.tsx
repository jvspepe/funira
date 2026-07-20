import { Flex, Grid, Heading } from "@chakra-ui/react";
import {
  CircleCheckIcon,
  CreditCardIcon,
  LeafIcon,
  TruckIcon,
} from "lucide-react";

import type { Feature } from "@/components/sections/features/feature-card";

import { FeatureCard } from "@/components/sections/features/feature-card";

const features: Feature[] = [
  {
    description: "Faça pedidos antes das 15:00 e receba no dia seguinte",
    heading: "Entrega no dia seguinte",
    icon: <TruckIcon />,
  },
  {
    description:
      "Produtos artesanais feitos com verdadeira paixão e habilidade",
    heading: "Feito por verdadeiros artesãos",
    icon: <CircleCheckIcon />,
  },
  {
    description:
      "Com nossos materiais e qualidade, você não encontrará preços melhores em nenhum outro lugar",
    heading: "Preços Imbatíveis",
    icon: <CreditCardIcon />,
  },
  {
    description:
      "Criamos com consciência, utilizando materiais 100% reciclados",
    heading: "Ajudando a Natureza",
    icon: <LeafIcon />,
  },
];

export function FeatureDisplay() {
  return (
    <Flex direction="column" gap="4">
      <Heading size="2xl" fontWeight="normal">
        O que faz de nossa marca diferente
      </Heading>
      <Grid
        gap="4"
        templateColumns={{ lg: "repeat(4, 1fr)", sm: "repeat(2, 1fr)" }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.heading} feature={feature} />
        ))}
      </Grid>
    </Flex>
  );
}
