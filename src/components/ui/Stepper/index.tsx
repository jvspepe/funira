import { Dispatch, SetStateAction } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

export type Sizes = 'base' | 'small';

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
  label?: string;
  size?: Sizes;
  className?: string;
};

const Stepper = ({
  value,
  setValue,
  minValue,
  maxValue,
  label,
  size = 'base',
  className,
}: Props) => {
  const handleDecrease = () => {
    if (minValue && value === minValue) return;
    setValue(value - 1);
  };

  const handleIncrease = () => {
    if (maxValue && value === maxValue) return;
    setValue(value + 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      width="fit-content"
      className={className}
    >
      {label && <Text>{label}</Text>}
      <Box
        height={size === 'small' ? '2rem' : '3rem'}
        display="flex"
        backgroundColor="#F5F5F5"
      >
        <IconButton
          onClick={() => handleDecrease()}
          aria-label="Diminuir quantidade"
          type="button"
          icon={<MinusIcon size={12} />}
          variant="unstyled"
          height="100%"
          aspectRatio="1/1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            backgroundColor: '#EBE8F4',
          }}
        />
        <Text
          as="span"
          height="100%"
          aspectRatio="1 / 1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value}
        </Text>
        <IconButton
          onClick={() => handleIncrease()}
          aria-label="Diminuir quantidade"
          type="button"
          icon={<PlusIcon size={12} />}
          variant="unstyled"
          height="100%"
          aspectRatio="1/1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            backgroundColor: '#EBE8F4',
          }}
        />
      </Box>
    </Box>
  );
};

export default Stepper;
