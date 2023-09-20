import { Link } from "react-router-dom";
import Button from "../Button";
import * as Styled from "./styles";
import Typography from "../Typography";

const Hero = () => {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Section>
          <Styled.Content>
            <Typography
              component="h2"
              fontFamily="heading"
              fontSize={"2xl"}
              fontWeight="normal"
            >
              Artigos de luxo para pessoas que amam design atemporal de
              qualidade.
            </Typography>
            <Typography>
              Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
              artigos para o lar até movéis.
            </Typography>
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
