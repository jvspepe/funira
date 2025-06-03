import { Flex, Grid, Heading } from '@chakra-ui/react';
import { CircleCheck, CreditCard, Leaf, Truck } from 'lucide-react';
import Feature from '@/@types/feature';
import { FeatureCard } from '@/components/section/features/feature-card';

const featureList: Feature[] = [
  {
    icon: Truck,
    title: 'Entrega no Dia Seguinte',
    details: 'Faça pedidos antes das 15:00 e receba no dia seguinte',
  },
  {
    icon: CircleCheck,
    title: 'Feito por verdadeiros artesãos',
    details: 'Produtos artesanais feitos com verdadeira paixão e habilidade',
  },
  {
    icon: CreditCard,
    title: 'Preços Imbatíveis',
    details:
      'Com nossos materiais e qualidade, você não encontrará preços melhores em nenhum outro lugar',
  },
  {
    icon: Leaf,
    title: 'Ajudando a Natureza',
    details: 'Criamos com consciência, utilizando materiais 100% reciclados.',
  },
];

export function Features() {
  return (
    <Flex
      direction="column"
      gap="{spacing.8}"
    >
      <Heading
        size="xl"
        fontWeight="normal"
      >
        O que faz de nossa marca diferente
      </Heading>
      <Grid
        gap="{spacing.6}"
        templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      >
        {featureList.map((feature) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
          />
        ))}
      </Grid>
    </Flex>
  );
}
