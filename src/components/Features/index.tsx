import { CheckCircle, CreditCard, Plant, Truck } from "@phosphor-icons/react";
import Feature from "../../@types/feature";

import FeatureCard from "../FeatureCard/FeatureCard";
import * as S from "./styles";
import Container from "../Container";
import Typography from "../Typography";

const featureList: Feature[] = [
  {
    icon: <Truck size={24} />,
    title: "Entrega no Dia Seguinte",
    details: "Faça pedidos antes das 15:00 e receba no dia seguinte",
  },
  {
    icon: <CheckCircle size={24} />,
    title: "Feito por verdadeiros artesãos",
    details: "Produtos artesanais feitos com verdadeira paixão e habilidade",
  },
  {
    icon: <CreditCard size={24} />,
    title: "Preços Imbatíveis",
    details:
      "Com nossos materiais e qualidade, você não encontrará preços melhores em nenhum outro lugar",
  },
  {
    icon: <Plant size={24} />,
    title: "Ajudando a Natureza",
    details: "Criamos com consciência, utilizando materiais 100% reciclados.",
  },
];

const Features = () => {
  return (
    <Container>
      <S.Section>
        <Typography
          component="h2"
          fontFamily="heading"
          fontSize={["xl", "2xl"]}
        >
          O que faz de nossa marca diferente
        </Typography>
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
