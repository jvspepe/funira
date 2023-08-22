import { styled } from "styled-components";
import { CheckCircle, CreditCard, Leaf, Truck } from "iconoir-react";
import Feature from "../@types/feature";
import FeatureCard from "./FeatureCard";

const featureList: Feature[] = [
  {
    icon: <Truck height={24} width={24} />,
    title: "Entrega no Dia Seguinte",
    details: "Faça pedidos antes das 15:00 e receba no dia seguinte",
  },
  {
    icon: <CheckCircle height={24} width={24} />,
    title: "Feito por verdadeiros artesãos",
    details: "Produtos artesanais feitos com verdadeira paixão e habilidade",
  },
  {
    icon: <CreditCard height={24} width={24} />,
    title: "Preços Imbatíveis",
    details:
      "Com nossos materiais e qualidade, você não encontrará preços melhores em nenhum outro lugar",
  },
  {
    icon: <Leaf height={24} width={24} />,
    title: "Ajudando a Natureza",
    details: "Criamos com consciência, utilizando materiais 100% reciclados.",
  },
];

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem;
  gap: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.md};
  font-weight: normal;
`;

const Display = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Features = () => {
  return (
    <Section>
      <Title>O que faz de nossa marca diferente</Title>
      <Display>
        {featureList.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </Display>
    </Section>
  );
};

export default Features;
