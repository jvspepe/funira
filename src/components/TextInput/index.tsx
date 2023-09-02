import { ComponentPropsWithRef, ReactNode } from "react";
import * as Styled from "./styles";

export type Props = ComponentPropsWithRef<"input"> & {
  variant?: "primary" | "secondary";
  label: string;
  showLabel?: boolean;
  inputIcon?: ReactNode;
  helperText?: string;
};

const TextInput = ({
  variant = "primary",
  label,
  showLabel = true,
  inputIcon,
  helperText,
  ...props
}: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Label $showLabel={showLabel} htmlFor={props.id}>
        {label}
      </Styled.Label>
      <Styled.InputWrapper>
        <Styled.Input $variant={variant} type="text" {...props} />
        {inputIcon}
      </Styled.InputWrapper>
      {helperText && <Styled.HelperText>{helperText}</Styled.HelperText>}
    </Styled.Wrapper>
  );
};

export default TextInput;
