import { Dispatch, SetStateAction } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import * as S from "./styles";

export type Sizes = "base" | "small";

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
  size = "base",
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
    <S.Wrapper className={className}>
      {label && <S.Label>{label}</S.Label>}
      <S.Controls $size={size}>
        <S.Button onClick={() => handleDecrease()} type="button">
          <Minus size={12} />
        </S.Button>
        <S.Value>{value}</S.Value>
        <S.Button onClick={() => handleIncrease()} type="button">
          <Plus size={12} />
        </S.Button>
      </S.Controls>
    </S.Wrapper>
  );
};

export default Stepper;
