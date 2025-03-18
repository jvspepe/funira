import { Box, Container, Heading } from '@chakra-ui/react';
import { CircleCheck, CreditCard, Leaf, Truck } from 'lucide-react';
import Feature from '@/@types/feature';
import FeatureCard from '@/components/FeatureCard';

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

const Features = () => {
  return (
    <Container
      maxW={{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      }}
      p={0}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
        padding={{ base: '3rem 1.5rem', sm: '3rem 0' }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '1.25rem', md: '1.5rem' }}
          fontWeight="normal"
          alignSelf="center"
        >
          O que faz de nossa marca diferente
        </Heading>
        <Box
          display="grid"
          gap="1.5rem"
          gridTemplateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        >
          {featureList.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Features;
