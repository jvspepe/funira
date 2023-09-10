import { styled } from "styled-components";

import breakpoints from "../../styles/breakpoints";
import font from "../../styles/font";

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${font.family.body};
`;

const Socials = styled.div`
  display: none;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

export { Wrapper, Text, Socials };
