import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/useGetCategories";
import ActionCart from "../ActionCart";
import ActionUser from "../ActionUser";
import MobileNav from "../Navbar";
import Nav from "../NavbarDesktop";
import Typography from "../Typography";
import * as S from "./styles";

const Header = () => {
  const categories = useGetCategories();

  return (
    <S.Wrapper>
      <Typography component={Link} to="/" fontFamily="heading" fontSize="2xl">
        Avion
      </Typography>
      <Nav routes={categories} />
      <S.Controls>
        <ActionCart />
        <ActionUser />
        <MobileNav routes={categories} />
      </S.Controls>
    </S.Wrapper>
  );
};

export default Header;
