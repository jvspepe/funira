import { ComponentPropsWithoutRef } from "react";
import * as S from "./styles";
type Props = ComponentPropsWithoutRef<"input"> & {
  variant?: "base" | "small";
  label: string;
};

const Checkbox = ({ variant = "base", label, ...props }: Props) => {
  return (
    <S.Wrapper>
      <S.Checkbox type="checkbox" {...props} />
      <S.Label $variant={variant} htmlFor={props.id}>
        {label}
      </S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
