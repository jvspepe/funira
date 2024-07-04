import { Link } from "react-router-dom";
import useGetCategories from "@/hooks/useGetCategories";
import ActionCart from "../ActionCart";
import ActionUser from "../ActionUser";
import MobileNav from "../Navbar";
import Typography from "../Typography";
import * as S from "./styles";
import Container from "../Container";
import Nav from "../NavbarDesktop";

const Header = () => {
  const categories = useGetCategories();

  return (
    <S.Header>
      <Container>
        <S.Wrapper>
          <Typography
            component={Link}
            to="/"
            fontFamily="heading"
            fontSize="2xl"
          >
            Funira
          </Typography>
          <Nav routes={categories} />
          <S.Controls>
            <ActionCart />
            <ActionUser />
            <MobileNav routes={categories} />
          </S.Controls>
        </S.Wrapper>
      </Container>
    </S.Header>
  );
};

export default Header;
