import { ReactNode, Ref } from 'react';
import { Field as ChakraField } from '@chakra-ui/react';

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  ref?: Ref<HTMLDivElement>;
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  optionalText?: ReactNode;
}

export function Field({ ref, ...props }: FieldProps) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props;
  return (
    <ChakraField.Root
      ref={ref}
      {...rest}
    >
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
}
