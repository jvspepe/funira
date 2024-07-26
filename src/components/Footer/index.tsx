import { FormEvent } from "react";
import { useTheme } from "styled-components";
import useGetCategories from "@/hooks/useGetCategories";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Copyright from "@/components/Copyright";
import TextInput from "@/components/ui/TextInput";
import * as S from "./styles";

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
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background.tertiary }}>
      <Container>
        <S.Footer>
          <S.FooterContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
              <S.FooterList>
                <S.FooterListHeading>Categories</S.FooterListHeading>
                {categories.map((item) => (
                  <S.FooterListContent
                    key={item.uid}
                    to={`/produtos?tipo=${item.value}`}
                  >
                    {item.label}
                  </S.FooterListContent>
                ))}
              </S.FooterList>
              <S.FooterList>
                <S.FooterListHeading>Menu</S.FooterListHeading>
                {productRoutes.map((route) => (
                  <S.FooterListContent
                    key={route.value}
                    to={`/produtos?ordem=${route.value}`}
                  >
                    {route.label}
                  </S.FooterListContent>
                ))}
              </S.FooterList>
              <S.FooterList>
                <S.FooterListHeading>Nossa Empresa</S.FooterListHeading>
                {companyRoutes.map((route) => (
                  <S.FooterListContent key={route} to="/">
                    {route}
                  </S.FooterListContent>
                ))}
              </S.FooterList>
            </div>
            <form
              onSubmit={(event: FormEvent) => event.preventDefault()}
              style={{ flexGrow: 1 }}
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
            </form>
          </S.FooterContainer>
          <Copyright />
        </S.Footer>
      </Container>
    </div>
  );
};

export default Footer;
