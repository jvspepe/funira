import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const Text = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.xs};
`;

export { Wrapper, Text };
