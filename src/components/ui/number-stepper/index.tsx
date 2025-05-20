import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  HStack,
  IconButton,
  NumberInput,
  Heading,
} from '@chakra-ui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

type Props = {
  label?: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  onValueDecrease?: () => void;
  onValueIncrease?: () => void;
  minValue?: number;
  maxValue?: number;
};

const NumberStepper = ({
  label,
  value,
  setValue,
  onValueDecrease,
  onValueIncrease,
  minValue,
  maxValue,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      {label && (
        <Heading
          fontSize={'1rem'}
          fontWeight="normal"
        >
          {label}
        </Heading>
      )}
      <NumberInput.Root
        defaultValue={String(value)}
        onValueChange={(v) => setValue(v.valueAsNumber)}
        min={minValue}
        max={maxValue}
        unstyled
        spinOnPress={false}
      >
        <HStack gap="{spacing.2}">
          <NumberInput.DecrementTrigger
            asChild
            onClick={onValueDecrease}
          >
            <IconButton
              variant="outline"
              size="xs"
            >
              <MinusIcon />
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText
            textAlign="center"
            fontSize="lg"
            minW="{spacing.6}"
          />
          <NumberInput.IncrementTrigger
            asChild
            onClick={onValueIncrease}
          >
            <IconButton
              variant="outline"
              size="xs"
            >
              <PlusIcon />
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
    </Box>
  );
};

export default NumberStepper;
