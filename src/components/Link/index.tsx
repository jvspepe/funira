import { LinkProps } from "react-router-dom";
import StyledLink from "./styles";

type Props = LinkProps & { variant?: "primary" | "secondary" };

const Link = ({ variant = "primary", ...props }: Props) => {
  return (
    <StyledLink $variant={variant} {...props}>
      {props.children}
    </StyledLink>
  );
};

export default Link;
