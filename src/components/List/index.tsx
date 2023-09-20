import { ReactNode } from "react";

import Typography from "../Typography";
import StyledList from "./styles";

type Props = {
  title: string;
  children: ReactNode;
};

const List = ({ title, children }: Props) => {
  return (
    <StyledList>
      <Typography fontFamily="heading">{title}</Typography>
      {children}
    </StyledList>
  );
};

export default List;
