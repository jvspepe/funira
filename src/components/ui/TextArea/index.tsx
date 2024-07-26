import { ReactNode, forwardRef } from "react";
import { TextareaAutosizeProps } from "react-textarea-autosize";
import * as Styled from "./styles";

export type Variants = "primary" | "secondary" | "opaque";
export type Sizes = "base" | "small";

export type Props = TextareaAutosizeProps & {
  variant?: Variants;
  size?: Sizes;
  label: string;
  error?: boolean;
  showLabel?: boolean;
  helperText?: string;
  inputIcon?: ReactNode;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function Input(
  {
    variant = "primary",
    size = "base",
    label,
    error = false,
    showLabel = true,
    helperText,
    inputIcon,
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
      <Styled.InputWrapper>
        <Styled.TextArea
          $variant={variant}
          $size={size}
          $error={error}
          ref={ref}
          {...props}
        />
        {inputIcon}
      </Styled.InputWrapper>
      {helperText && (
        <Styled.HelperText $error={error}>{helperText}</Styled.HelperText>
      )}
    </Styled.Wrapper>
  );
});

export default TextArea;
