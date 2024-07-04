import { ReactNode } from "react";

import Typography from "@/components/Typography";
import StyledList from "./styles";

type Props = {
  title: string;
  children: ReactNode;
};

const List = ({ title, children }: Props) => {
  return (
    <StyledList>
      <Typography fontFamily="heading" variant="secondary">
        {title}
      </Typography>
      {children}
    </StyledList>
  );
};

export default List;
