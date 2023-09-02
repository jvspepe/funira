import { ComponentPropsWithoutRef } from "react";
import StyledContainer from "./styles";

type Props = ComponentPropsWithoutRef<"div">;

const Container = ({ ...props }: Props) => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
};

export default Container;
