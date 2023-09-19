import * as Styled from "./styles";
import Link from "../Link";
import { TCategory } from "../../@types/categories";

type Props = {
  routes: TCategory[];
};

const Nav = ({ routes }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.List>
        <li key="Todos">
          <Link to="/produtos">Todos</Link>
        </li>
        {routes.map((route) => (
          <li key={route.label}>
            <Link to={`produtos?tipo=${route.value}`}>{route.label}</Link>
          </li>
        ))}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default Nav;
