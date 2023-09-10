import { ElementType } from "react";
import Styles from "./styles";
import font from "../../styles/font";

export type Variants = "primary" | "secondary";
export type Fonts = keyof (typeof font)["family"];
export type Sizes = keyof (typeof font)["size"];

export type Props<T extends ElementType> = {
  component?: T;
  variant?: Variants;
  font?: Fonts;
  size?: Sizes;
};

const Typography = <T extends ElementType = "p">({
  component,
  variant = "primary",
  font = "body",
  size = "md",
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "p";

  return (
    <Styles
      as={Component}
      {...props}
      $variant={variant}
      $font={font}
      $size={size}
    >
      {props.children}
    </Styles>
  );
};

export default Typography;
