import { type Ref } from 'react';
import { NumberInput as ChakraNumberInput } from '@chakra-ui/react';

interface NumberInputProps extends ChakraNumberInput.RootProps {
  ref?: Ref<HTMLDivElement | null>;
}

export function NumberInput({ ref, ...props }: NumberInputProps) {
  const { children, ...rest } = props;
  return (
    <ChakraNumberInput.Root
      ref={ref}
      variant="outline"
      {...rest}
    >
      {children}
      <ChakraNumberInput.Control>
        <ChakraNumberInput.IncrementTrigger />
        <ChakraNumberInput.DecrementTrigger />
      </ChakraNumberInput.Control>
    </ChakraNumberInput.Root>
  );
}

export const NumberInputField = ChakraNumberInput.Input;
export const NumberInputScrubber = ChakraNumberInput.Scrubber;
export const NumberInputLabel = ChakraNumberInput.Label;
