import { type Dispatch, type SetStateAction } from 'react';
import {
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberInput,
} from '@chakra-ui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface NumberStepperProps {
  label?: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  onValueDecrease?: () => void;
  onValueIncrease?: () => void;
  minValue?: number;
  maxValue?: number;
}

export function NumberStepper({
  label,
  value,
  setValue,
  onValueDecrease,
  onValueIncrease,
  minValue,
  maxValue,
}: NumberStepperProps) {
  return (
    <Flex
      direction="column"
      gap="{spacing.4}"
    >
      {label && (
        <Heading
          size="md"
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
        width={{ base: 'full', md: 'fit-content' }}
      >
        <HStack
          backgroundColor="bg.subtle"
          borderRadius="{radii.l2}"
          justifyContent="space-between"
        >
          <NumberInput.DecrementTrigger
            asChild
            onClick={onValueDecrease}
          >
            <IconButton
              variant="subtle"
              size="lg"
            >
              <Icon>
                <MinusIcon />
              </Icon>
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText
            textAlign="center"
            fontSize="md"
            minW="{spacing.8}"
          />
          <NumberInput.IncrementTrigger
            asChild
            onClick={onValueIncrease}
          >
            <IconButton
              variant="subtle"
              size="lg"
            >
              <Icon>
                <PlusIcon />
              </Icon>
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
    </Flex>
  );
}
