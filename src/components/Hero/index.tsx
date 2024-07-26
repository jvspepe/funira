import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import * as S from "./styles";

const Hero = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Section>
          <S.Content>
            <S.ContentHeader>
              Artigos de luxo para pessoas que amam design atemporal de
              qualidade.
            </S.ContentHeader>
            <S.ContentBody>
              Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
              artigos para o lar até movéis.
            </S.ContentBody>
          </S.Content>
          <Button component={Link} variant="secondary" to="/produtos">
            Ver coleção
          </Button>
        </S.Section>
        <S.Image src="/images/hero.jpg" alt="" aria-hidden />
      </S.Container>
    </S.Wrapper>
  );
};

export default Hero;
