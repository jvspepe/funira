import { CheckCircle } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Typography from "@/components/ui/Typography";
import * as Styled from "./styles";

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
              <Typography
                variant="secondary"
                display="flex"
                alignItems="center"
                key={benefit}
                style={{ gap: "0.5rem" }}
              >
                <CheckCircle size={16} weight="fill" />
                {benefit}
              </Typography>
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
