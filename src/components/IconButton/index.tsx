import { ElementType } from "react";
import Styled from "./styles";

export type Variants = "primary" | "secondary";
export type Sizes = "big" | "base" | "small";

type Props<T extends ElementType> = {
  component?: T;
  variant?: Variants;
  size?: Sizes;
};

const IconButton = <T extends ElementType = "button">({
  component,
  variant = "primary",
  size = "base",
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";
  return (
    <Styled as={Component} $variant={variant} $size={size} {...props}>
      {props.children}
    </Styled>
  );
};

export default IconButton;
