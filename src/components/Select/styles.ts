import { styled } from "styled-components";
import font from "../../styles/font";
import { Props, Sizes, Variants } from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
    `};
`;

const Select = styled.select<{
  $variant: Variants;
  $size: Sizes;
  $error: Props["error"];
}>`
  /* appearance: none; */
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({ $size }) => ($size === "small" ? "0.5rem" : "0.75rem")};
  border: 1px solid transparent;
  outline: none;

  padding: ${({ $size }) =>
    $size === "small" ? "0.5rem 0.75rem" : "0.75rem 1rem"};

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

  & option {
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export { Wrapper, Label, Select };
