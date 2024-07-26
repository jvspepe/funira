import { ElementType } from "react";
import Styles, { BoxProps } from "./styles";

export type Props<T extends ElementType> = BoxProps & {
  component?: T;
};

const Box = <T extends ElementType = "div">({
  component,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "div";

  return (
    <Styles as={Component} {...props}>
      {props.children}
    </Styles>
  );
};

export default Box;
