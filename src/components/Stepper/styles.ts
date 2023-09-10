import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  font-family: ${font.family.body};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  height: 3rem;
  max-width: fit-content;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Button = styled.button`
  font-family: inherit;
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.75rem 1rem;
  height: 100%;
  aspect-ratio: 1;
`;

export { Wrapper, Button, Value };
