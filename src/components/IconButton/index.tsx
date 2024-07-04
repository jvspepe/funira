import { ElementType } from "react";
import { FlexboxProps, GridProps, LayoutProps } from "styled-system";
import Styled from "./styles";

type Props<T extends ElementType> = FlexboxProps &
  GridProps &
  LayoutProps & {
    component?: T;
  };

const IconButton = <T extends ElementType = "button">({
  component,

  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";
  return (
    <Styled as={Component} {...props}>
      {props.children}
    </Styled>
  );
};

export default IconButton;
