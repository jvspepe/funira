import { CheckCircle } from "@phosphor-icons/react";
import TextInput from "../TextInput";
import Button from "../Button";
import * as Styled from "./styles";
import Typography from "../Typography";

const benefits = ["Ofertas Exclusivas", "Eventos", "Descontos"];

const Newsletter = () => {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Section>
          <Styled.Content>
            <Typography
              component="h6"
              variant="secondary"
              fontFamily="heading"
              fontSize={["2xl", null, null, "3xl"]}
            >
              Junte-se ao clube e aproveite os benefícios.
            </Typography>
            <Typography variant="secondary" fontSize={["sm", null, null, "lg"]}>
              Cadastre-se para receber nossa newsletter e receba ofertas
              exclusivas em novas coleções, liquidações, lojas pop-up e muito
              mais.
            </Typography>
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
