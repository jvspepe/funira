import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/useGetCategories";
import Container from "../Container";
import Button from "../Button";
import Copyright from "../Copyright";
import List from "../List";
import TextInput from "../TextInput";
import Typography from "../Typography";
import * as S from "./styles";

const productRoutes = ["Novos", "Mais Vendidos", "Melhor Avaliados", "Todos"];
const companyRoutes = ["Sobre", "Contato", "Carreiras"];

const Footer = () => {
  const categories = useGetCategories();
  return (
    <S.Wrapper>
      <Container>
        <S.Footer>
          <S.FooterContainer>
            <S.ListContainer>
              <List title="Categorias">
                {categories.map((item) => (
                  <Typography
                    component={Link}
                    key={item.uid}
                    to={`/produtos?tipo=${item.value}`}
                    variant="secondary"
                    size="sm"
                  >
                    {item.label}
                  </Typography>
                ))}
              </List>
              <List title="Menu">
                {productRoutes.map((route) => (
                  <Typography
                    component={Link}
                    key={route}
                    to="/"
                    variant="secondary"
                    size="sm"
                  >
                    {route}
                  </Typography>
                ))}
              </List>
              <List title="Nossa Empresa">
                {companyRoutes.map((route) => (
                  <Typography
                    component={Link}
                    key={route}
                    to="/"
                    variant="secondary"
                    size="sm"
                  >
                    {route}
                  </Typography>
                ))}
              </List>
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
