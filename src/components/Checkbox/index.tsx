import { ComponentPropsWithoutRef } from "react";
import * as S from "./styles";
import Typography from "../Typography";
type Props = ComponentPropsWithoutRef<"input"> & {
  variant?: "base" | "small";
  label: string;
};

const Checkbox = ({ variant = "base", label, ...props }: Props) => {
  return (
    <S.Wrapper>
      <S.Checkbox type="checkbox" {...props} />
      <Typography
        component="label"
        fontSize={variant === "small" ? "sm" : "md"}
        htmlFor={props.id}
      >
        {label}
      </Typography>
    </S.Wrapper>
  );
};

export default Checkbox;
