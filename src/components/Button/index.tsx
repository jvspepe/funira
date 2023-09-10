import { ElementType, ReactNode } from "react";
import StyledButton from "./styles";

export type Variants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "opaque"
  | "transparent";
export type Sizes = "base" | "small";

export type Props<T extends ElementType> = {
  component?: T;
  variant?: Variants;
  size?: Sizes;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const Button = <T extends ElementType = "button">({
  component,
  variant = "primary",
  size = "base",
  startIcon,
  endIcon,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";

  return (
    <StyledButton as={Component} $variant={variant} $size={size} {...props}>
      {startIcon}
      {props.children}
      {endIcon}
    </StyledButton>
  );
};

export default Button;
