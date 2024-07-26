import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";
import IconButton from "@/components/ui/IconButton";

const Button = styled(IconButton)`
  display: block;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export default Button;
