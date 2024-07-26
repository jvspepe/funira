import styled from "styled-components";
import IconButton from "../ui/IconButton";
import breakpoints from "@/styles/breakpoints";

const Button = styled(IconButton)`
  display: block;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export default Button;
