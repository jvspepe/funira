import TextareaAutosize from "react-textarea-autosize";
import { styled } from "styled-components";
import { Props, Sizes, Variants } from ".";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const Label = styled.label<{
  $variant: Variants;
  $size: Sizes;
  $error: Props["error"];
  $showLabel: Props["showLabel"];
}>`
  width: fit-content;
  font-family: ${font.family.heading};
  font-size: ${({ $size }) => $size === "small" && font.size.sm};

  color: ${({ $variant, $error, theme }) => {
    if ($error) return "red";
    switch ($variant) {
      case "primary":
        return theme.colors.text.primary;
      case "secondary":
      case "opaque":
        return theme.colors.text.secondary;
    }
  }};

  ${({ $showLabel }) =>
    !$showLabel &&
    `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `}
`;

const InputWrapper = styled.div`
  display: flex;
`;

const TextArea = styled(TextareaAutosize)<{
  $variant: Variants;
  $size: Sizes;
  $error: Props["error"];
}>`
  width: 100%;
  outline: 1px solid transparent;
  outline-offset: 0;
  border: none;
  padding: ${({ $size }) =>
    $size === "small" ? "0.5rem 0.75rem" : "0.75rem 1rem"};
  resize: none;
  color: ${({ $variant, $error, theme }) => {
    if ($error) return "red";
    return $variant === "primary"
      ? theme.colors.text.primary
      : theme.colors.text.secondary;
  }};
  background-color: ${({ $variant, $error, theme }) => {
    if ($error) return "#fff1f2";
    return $variant === "primary"
      ? theme.colors.background.secondary
      : "rgba(255, 255, 255, 0.15)";
  }};
  font-family: ${font.family.body};
  transition: background-color 200ms, outline-color 200ms;

  &::placeholder {
    opacity: 0.5;
  }

  &:hover,
  &:focus {
    background-color: ${({ $variant, $error, theme }) => {
      if ($error) return "#ffe4e6";
      return $variant === "primary"
        ? theme.colors.border.primary
        : "rgba(255, 255, 255, 0.15)";
    }};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.border.secondary};
  }
`;

const HelperText = styled.span<{ $error: Props["error"] }>`
  color: ${({ $error, theme }) => ($error ? "red" : theme.colors.text.primary)};
  font-size: ${font.size.xs};
  font-family: ${font.family.heading};
`;

export { Wrapper, Label, InputWrapper, TextArea, HelperText };
