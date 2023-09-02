import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 0.125rem;
  overflow: hidden;

  &:checked {
    background-image: url("/icons/checkmark.svg");
    background-position: center;
    background-size: cover;
    background-color: ${({ theme }) => theme.colors.border.secondary};
    background-repeat: no-repeat;
    border-color: ${({ theme }) => theme.colors.border.secondary};
  }
`;

const Label = styled.label<{ $variant: "base" | "small" }>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${({ $variant }) =>
    $variant === "small" ? font.size.sm : font.size.md};
`;

export { Wrapper, Checkbox, Label };
