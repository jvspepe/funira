import { Dispatch, SetStateAction } from 'react';
import { HStack, IconButton, NumberInput } from '@chakra-ui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
};

const Stepper = ({ value, setValue, minValue, maxValue }: Props) => {
  return (
    <NumberInput.Root
      defaultValue={String(value)}
      onValueChange={(v) => setValue(v.valueAsNumber)}
      min={minValue}
      max={maxValue}
      unstyled
      spinOnPress={false}
    >
      <HStack gap="0.75rem">
        <NumberInput.DecrementTrigger asChild>
          <IconButton
            variant="outline"
            size="sm"
          >
            <MinusIcon />
          </IconButton>
        </NumberInput.DecrementTrigger>
        <NumberInput.ValueText
          textAlign="center"
          fontSize="lg"
          minW="3ch"
        />
        <NumberInput.IncrementTrigger asChild>
          <IconButton
            variant="outline"
            size="sm"
          >
            <PlusIcon />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
};

export default Stepper;
