import { ComponentPropsWithoutRef } from "react";
import StyledIconButton from "./styles";

export type Props = ComponentPropsWithoutRef<"button"> & {
  $variant?: "primary" | "secondary";
};

const IconButton = ({ $variant = "primary", ...props }: Props) => {
  return (
    <StyledIconButton $variant={$variant} {...props}>
      {props.children}
    </StyledIconButton>
  );
};

export default IconButton;
