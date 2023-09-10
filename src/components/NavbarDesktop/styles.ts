import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.nav`
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
`;

export { Wrapper, List };
