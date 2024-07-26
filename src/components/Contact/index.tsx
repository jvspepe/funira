import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import * as S from "./styles";

const Contact = () => {
  return (
    <Container>
      <S.Section>
        <S.Wrapper>
          <S.Heading>Começou com uma ideia</S.Heading>
          <S.Content>
            A Avion foi criada com a ideia de tornar móveis artesanais de alta
            qualidade acessíveis ao mercado em geral, refletindo nossa paixão
            pela criação e design de peças para o lar meticulosamente
            elaboradas.
          </S.Content>
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
