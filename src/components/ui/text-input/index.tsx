import { ReactNode, Ref } from 'react';
import {
  type InputProps,
  Field as ChakraField,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react';

interface TextInputProps extends InputProps {
  ref?: Ref<HTMLInputElement>;
  label: ReactNode;
  hideLabel?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  errorText?: ReactNode;
  optionalText?: ReactNode;
}

export function TextInput({
  ref,
  label,
  hideLabel,
  helperText,
  error,
  errorText,
  optionalText,
  ...props
}: TextInputProps) {
  return (
    <ChakraField.Root invalid={error}>
      {hideLabel ? (
        <VisuallyHidden>
          <ChakraField.Label>
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        </VisuallyHidden>
      ) : (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      <Input
        ref={ref}
        {...props}
      />
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
}
