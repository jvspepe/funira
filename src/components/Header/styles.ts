import { Link as RouterLink } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import breakpoints from "@/styles/breakpoints";

const fadeDown = keyframes`
  from {
    transform: translateY(-10%);
    opacity: 0;
  }
  
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  height: 5.25rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.primary};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  z-index: 1000;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1.5rem;

  animation: ${fadeDown} 500ms;

  @media (min-width: ${breakpoints.md}) {
    padding: 1.5rem 0;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Logo = styled(RouterLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
`;

export { Header, Wrapper, Controls, Logo };
