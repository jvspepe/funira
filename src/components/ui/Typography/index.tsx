import { ElementType } from "react";
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";
import Styles from "./styles";

export type Props<T extends ElementType> = FlexboxProps &
  LayoutProps &
  SpaceProps &
  TypographyProps & {
    component?: T;
    variant?: "primary" | "secondary";
  };

const Typography = <T extends ElementType = "p">({
  component,
  variant = "primary",
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "p";

  return (
    <Styles $variant={variant} as={Component} {...props}>
      {props.children}
    </Styles>
  );
};

export default Typography;
