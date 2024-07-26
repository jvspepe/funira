import { styled } from "styled-components";
import { Sizes } from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Controls = styled.div<{ $size: Sizes }>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
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

export { Wrapper, Label, Controls, Button, Value };
