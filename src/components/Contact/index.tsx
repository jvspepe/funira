import Container from "../Container";
import Button from "../Button";
import * as S from "./styles";

const Contact = () => {
  return (
    <Container>
      <S.Section>
        <S.Wrapper>
          <S.Title>Começou com uma ideia</S.Title>
          <S.Details>
            A Avion foi criada com a ideia de tornar móveis artesanais de alta
            qualidade acessíveis ao mercado em geral, refletindo nossa paixão
            pela criação e design de peças para o lar meticulosamente
            elaboradas.
          </S.Details>
          <Button variant="opaque" to="/">
            Entrar em contato
          </Button>
        </S.Wrapper>
        <S.Image src="/images/cta.jpg" alt="" />
      </S.Section>
    </Container>
  );
};

export default Contact;
