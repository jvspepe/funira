import { Dispatch, SetStateAction } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import * as Styled from "./styles";

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;

  className?: string;
};

const Stepper = ({ value, setValue, minValue, maxValue, className }: Props) => {
  const handleDecrease = () => {
    if (minValue && value === minValue) return;
    setValue(value - 1);
  };

  const handleIncrease = () => {
    if (maxValue && value === maxValue) return;
    setValue(value + 1);
  };

  return (
    <Styled.Wrapper className={className}>
      <Styled.Button onClick={() => handleDecrease()} type="button">
        <Minus size={12} />
      </Styled.Button>
      <Styled.Value>{value}</Styled.Value>
      <Styled.Button onClick={() => handleIncrease()} type="button">
        <Plus size={12} />
      </Styled.Button>
    </Styled.Wrapper>
  );
};

export default Stepper;
