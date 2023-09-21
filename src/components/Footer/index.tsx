import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/useGetCategories";
import Container from "../Container";
import Button from "../Button";
import Copyright from "../Copyright";
import List from "../List";
import TextInput from "../TextInput";
import Typography from "../Typography";
import * as S from "./styles";
import Box from "../Box";
import { FormEvent } from "react";

const productRoutes = [
  { label: "Maior Preço", value: "maior-preço" },
  { label: "Menor Preço", value: "menor-preço" },
  { label: "Novos", value: "novo" },
  { label: "Mais Vendidos", value: "mais-vendidos" },
  { label: "Melhor Avaliados", value: "melhor-avaliados" },
];
const companyRoutes = ["Sobre", "Contato", "Carreiras"];

const Footer = () => {
  const categories = useGetCategories();
  return (
    <Box backgroundColor="background.tertiary">
      <Container>
        <S.Footer>
          <S.FooterContainer>
            <Box display="flex" flexWrap="wrap" gridGap="3rem">
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
                    key={route.value}
                    to={`/produtos?ordem=${route.value}`}
                    variant="secondary"
                    size="sm"
                  >
                    {route.label}
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
            </Box>
            <Box
              component="form"
              onSubmit={(event: FormEvent) => event.preventDefault()}
              flexGrow={1}
            >
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
            </Box>
          </S.FooterContainer>
          <Copyright />
        </S.Footer>
      </Container>
    </Box>
  );
};

export default Footer;
