import { ReactNode } from "react";
import * as Styled from "./styles";

type Props = {
  title: string;
  children: ReactNode;
};

const List = ({ title, children }: Props) => {
  return (
    <Styled.List>
      <Styled.Heading>{title}</Styled.Heading>
      {children}
    </Styled.List>
  );
};

export default List;
