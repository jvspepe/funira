import { CheckCircle } from "@phosphor-icons/react";
import TextInput from "../TextInput";
import Button from "../Button";
import * as Styled from "./styles";

const benefits = ["Ofertas Exclusivas", "Eventos", "Descontos"];

const Newsletter = () => {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Section>
          <Styled.Content>
            <Styled.Heading>
              Junte-se ao clube e aproveite os benefícios.
            </Styled.Heading>
            <Styled.Paragraph>
              Cadastre-se para receber nossa newsletter e receba ofertas
              exclusivas em novas coleções, liquidações, lojas pop-up e muito
              mais.
            </Styled.Paragraph>
          </Styled.Content>
          <Styled.Benefits>
            {benefits.map((benefit) => (
              <Styled.BenefitItem key={benefit}>
                <CheckCircle size={16} weight="fill" />
                {benefit}
              </Styled.BenefitItem>
            ))}
          </Styled.Benefits>
          <form onSubmit={(event) => event.preventDefault()}>
            <TextInput
              label="Inscreva-se"
              showLabel={false}
              inputIcon={<Button type="submit">Confirmar</Button>}
              placeholder="seu@email.com"
            />
          </form>
        </Styled.Section>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Newsletter;
