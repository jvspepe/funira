import { ComponentPropsWithoutRef } from "react";
import * as S from "./styles";

type Props = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  id: string;
  label: string;
};

const Checkbox = ({ id, label, ...props }: Props) => {
  return (
    <S.Wrapper>
      <S.Checkbox id={id} type="checkbox" {...props} />
      <S.Label htmlFor={id}>{label}</S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
