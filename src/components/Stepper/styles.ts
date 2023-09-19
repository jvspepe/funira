import { styled } from "styled-components";
import { Sizes } from ".";
import font from "../../styles/font";

const Wrapper = styled.div<{ $size: Sizes }>`
  font-family: ${font.family.body};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  height: ${({ $size }) => ($size === "small" ? "2rem" : "3rem")};
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
`;

export { Wrapper, Button, Value };
