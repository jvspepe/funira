import { ComponentPropsWithoutRef } from "react";
import Styled from "./styles";

type Props = ComponentPropsWithoutRef<"span">;

const Spinner = ({ ...props }: Props) => {
  return <Styled {...props} />;
};

export default Spinner;
