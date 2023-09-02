import Container from "../Container";
import LinkList from "../LinkList";
import TextInput from "../TextInput";
import Button from "../Button";
import Copyright from "../Copyright";
import * as S from "./styles";

const navRoutes = [
  "Móveis",
  "Eletrodomésticos",
  "Eletroportáteis",
  "TVs e Vídeo",
];
const productRoutes = ["Novos", "Mais Vendidos", "Melhor Avaliados", "Todos"];
const companyRoutes = ["Sobre", "Contato", "Carreiras"];

const Footer = () => {
  return (
    <S.Wrapper>
      <Container>
        <S.Footer>
          <S.FooterContainer>
            <S.ListContainer>
              <LinkList title="Categorias" links={navRoutes} />
              <LinkList title="Menu" links={productRoutes} />
              <LinkList title="Nossa Empresa" links={companyRoutes} />
            </S.ListContainer>
            <S.MailForm onSubmit={(event) => event.preventDefault()}>
              <TextInput
                label="Inscreva-se na nossa lista de e-mails"
                variant="secondary"
                inputIcon={
                  <Button variant="secondary" type="submit">
                    Confirmar
                  </Button>
                }
                placeholder="seu@email.com"
              />
            </S.MailForm>
          </S.FooterContainer>
          <Copyright />
        </S.Footer>
      </Container>
    </S.Wrapper>
  );
};

export default Footer;
