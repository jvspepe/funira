import { CheckCircle, CreditCard, Leaf, Truck } from "iconoir-react";
import Feature from "../../@types/feature";
import Container from "../Container";
import FeatureCard from "../FeatureCard/FeatureCard";
import * as S from "./styles";

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

const Features = () => {
  return (
    <Container>
      <S.Section>
        <S.Title>O que faz de nossa marca diferente</S.Title>
        <S.Display>
          {featureList.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </S.Display>
      </S.Section>
    </Container>
  );
};

export default Features;
