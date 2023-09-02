import { styled } from "styled-components";
import font from "../../styles/font";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
`;

const Socials = styled.div`
  display: none;
  gap: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

export { Wrapper, Socials };
