import { Link } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  routes: string[];
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

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.font.body};
  text-decoration: none;
`;

const Nav = ({ routes }: Props) => {
  return (
    <Root>
      <NavList>
        {routes.map((route) => (
          <li key={route}>
            <NavLink to="/">{route}</NavLink>
          </li>
        ))}
      </NavList>
    </Root>
  );
};

export default Nav;
