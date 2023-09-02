import { styled } from "styled-components";
import Link from "./Link";

type Props = {
  routes: { path: string; label: string }[];
};

const Root = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
`;

const Nav = ({ routes }: Props) => {
  return (
    <Root>
      <NavList>
        {routes.map((route) => (
          <li key={route.label}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </NavList>
    </Root>
  );
};

export default Nav;
