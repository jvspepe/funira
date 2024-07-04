import breakpoints from "@/styles/breakpoints";
import { styled } from "styled-components";
import Typography from "../Typography";

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.primary};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  z-index: 100;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    padding: 1.5rem 0;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Logo = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export { Header, Wrapper, Controls, Logo };
