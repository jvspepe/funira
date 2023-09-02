import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import StyledButton from "./styles";

export type CommonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "opaque" | "transparent";
  size?: "base" | "small";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & RouterLinkProps;
type Props = ButtonProps | LinkProps;

const Button = ({
  variant = "primary",
  size = "base",
  startIcon,
  endIcon,
  ...props
}: Props) => {
  const isLink = "to" in props;

  if (isLink) {
    const linkProps = props as LinkProps;
    return (
      <StyledButton
        as={RouterLink}
        $variant={variant}
        $size={size}
        {...linkProps}
      >
        {startIcon}
        {props.children}
        {endIcon}
      </StyledButton>
    );
  } else {
    const buttonProps = props as ButtonProps;
    return (
      <StyledButton
        as="button"
        $variant={variant}
        $size={size}
        {...buttonProps}
      >
        {startIcon}
        {props.children}
        {endIcon}
      </StyledButton>
    );
  }
};

export default Button;
