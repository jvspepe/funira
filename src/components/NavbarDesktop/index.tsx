import { Link } from "react-router-dom";
import { TCategory } from "../../@types/categories";
import Typography from "../Typography";
import * as Styled from "./styles";

type Props = {
  routes: TCategory[];
};

const Nav = ({ routes }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.List>
        <li key="Todos">
          <Typography component={Link} to="/produtos">
            Todos
          </Typography>
        </li>
        {routes.map((route) => (
          <li key={route.label}>
            <Typography component={Link} to={`produtos?tipo=${route.value}`}>
              {route.label}
            </Typography>
          </li>
        ))}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default Nav;
