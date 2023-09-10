import { ComponentPropsWithRef, forwardRef } from "react";
import * as Styled from "./styles";

export type Variants = "primary" | "secondary";
export type Sizes = "base" | "small";

export type Props = Omit<ComponentPropsWithRef<"select">, "size"> & {
  variant?: Variants;
  size?: Sizes;
  showLabel?: boolean;
  error?: boolean;
  label: string;
  helperText?: string;
};

const Select = forwardRef<HTMLSelectElement, Props>(function Input(
  {
    variant = "primary",
    size = "base",
    label,
    showLabel = true,
    error = false,
    ...props
  },
  ref
) {
  return (
    <Styled.Wrapper>
      <Styled.Label
        $variant={variant}
        $size={size}
        $error={error}
        $showLabel={showLabel}
        htmlFor={props.id}
      >
        {label}
      </Styled.Label>
      <Styled.Select
        $variant={variant}
        $size={size}
        $error={error}
        ref={ref}
        {...props}
      >
        {props.children}
      </Styled.Select>
    </Styled.Wrapper>
  );
});

export default Select;
