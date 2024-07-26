import { styled } from "styled-components";
import { Sizes, Variants } from ".";

const StyledButton = styled.button<{
  $variant: Variants;
  $size: Sizes;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $size }) => ($size === "small" ? "0.5rem" : "0.75rem")};

  border: 1px solid transparent;

  outline: none;

  padding: ${({ $size }) =>
    $size === "small" ? "0.75rem 1.25rem" : "1rem 2rem"};

  font-family: ${({ theme }) => theme.fonts.body};
  text-decoration: none;
  transition: background-color 300ms, outline-color 300ms;
  cursor: pointer;

  &:disabled {
    opacity: 0.9;
  }

  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
    flex-shrink: 0;
  }

  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case "primary":
        return theme.colors.background.tertiary;
      case "secondary":
        return theme.colors.background.secondary;
      case "tertiary":
        return theme.colors.background.primary;
      case "opaque":
        return "rgba(249, 249, 249, 0.15)";
      case "transparent":
        return "transparent";
    }
  }};
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case "primary":
      case "opaque":
        return theme.colors.text.secondary;
      case "secondary":
      case "tertiary":
      case "transparent":
        return theme.colors.text.primary;
      default:
        return theme.colors.text.primary;
    }
  }};

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: ${({ $variant, theme }) => {
      switch ($variant) {
        case "primary":
          return "#1E193E";
        case "secondary":
        case "transparent":
          return theme.colors.border.primary;
        case "tertiary":
          return theme.colors.background.secondary;
        case "opaque":
          return "rgba(249, 249, 249, 0.3)";
      }
    }};
  }

  &:not(:disabled):focus {
    border-color: ${({ $variant, theme }) => {
      switch ($variant) {
        case "primary":
        case "opaque":
          return theme.colors.background.primary;
        case "secondary":
        case "transparent":
        case "tertiary":
          return theme.colors.background.tertiary;
      }
    }};
  }
`;

export default StyledButton;
