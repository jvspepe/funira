import Button from "../Button";
import * as S from "./styles";

const Hero = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Section>
          <S.Content>
            <S.Heading>
              Artigos de luxo para pessoas que amam design atemporal de
              qualidade.
            </S.Heading>
            <S.Text>
              Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
              artigos para o lar até móveis.
            </S.Text>
          </S.Content>
          <Button variant="secondary" to="/produtos">
            Ver coleção
          </Button>
        </S.Section>
        <S.Image src="/images/hero.jpg" alt="" aria-hidden />
      </S.Container>
    </S.Wrapper>
  );
};

export default Hero;
