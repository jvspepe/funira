import { Link } from "react-router-dom";
import Button from "../Button";
import * as Styled from "./styles";

const Hero = () => {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Section>
          <Styled.Content>
            <Styled.Heading>
              Artigos de luxo para pessoas que amam design atemporal de
              qualidade.
            </Styled.Heading>
            <Styled.Paragraph>
              Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
              artigos para o lar até movéis.
            </Styled.Paragraph>
          </Styled.Content>
          <Button component={Link} variant="secondary" to="/produtos">
            Ver coleção
          </Button>
        </Styled.Section>
        <Styled.Image src="/images/hero.jpg" alt="" aria-hidden />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Hero;
