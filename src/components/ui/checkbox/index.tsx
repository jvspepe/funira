import { type InputHTMLAttributes, type ReactNode, Ref } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

interface CheckboxProps extends ChakraCheckbox.RootProps {
  ref?: Ref<HTMLInputElement>;
  icon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  rootRef?: Ref<HTMLLabelElement>;
}

export function Checkbox({ ref, ...props }: CheckboxProps) {
  const { icon, children, inputProps, rootRef, ...rest } = props;
  return (
    <ChakraCheckbox.Root
      ref={rootRef}
      {...rest}
      colorPalette="blue"
    >
      <ChakraCheckbox.HiddenInput
        ref={ref}
        {...inputProps}
      />
      <ChakraCheckbox.Control borderRadius="sm">
        {icon ?? <ChakraCheckbox.Indicator />}
      </ChakraCheckbox.Control>
      {children != null && (
        <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
      )}
    </ChakraCheckbox.Root>
  );
}
