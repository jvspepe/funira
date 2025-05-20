import { Ref } from 'react';
import { Field as ChakraField, Input, InputProps } from '@chakra-ui/react';

type Props = InputProps & {
  ref?: Ref<HTMLInputElement>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
};

const TextInput = ({
  ref,
  label,
  helperText,
  error,
  errorText,
  optionalText,
  ...props
}: Props) => {
  return (
    <ChakraField.Root invalid={error}>
      {label && (
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
};

export default TextInput;
