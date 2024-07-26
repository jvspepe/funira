import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import * as S from "./styles";

const Contact = () => {
  return (
    <Container>
      <S.Section>
        <S.Wrapper>
          <Typography
            component="h5"
            variant="secondary"
            fontFamily="heading"
            fontSize={["xl", null, "3xl"]}
          >
            Começou com uma ideia
          </Typography>
          <Typography
            variant="secondary"
            fontSize={["sm", null, "lg"]}
            flexGrow={1}
          >
            A Avion foi criada com a ideia de tornar móveis artesanais de alta
            qualidade acessíveis ao mercado em geral, refletindo nossa paixão
            pela criação e design de peças para o lar meticulosamente
            elaboradas.
          </Typography>
          <Button component={Link} variant="opaque" to="/">
            Entrar em contato
          </Button>
        </S.Wrapper>
        <S.Image src="/images/cta.jpg" alt="" />
      </S.Section>
    </Container>
  );
};

export default Contact;
