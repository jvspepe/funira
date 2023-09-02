import { LinkProps } from "react-router-dom";
import StyledLink from "./styles";

type Props = LinkProps;

const Link = ({ ...props }: Props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};

export default Link;
