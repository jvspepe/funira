import { Link } from "react-router-dom";
import { styled } from "styled-components";
import font from "../../styles/font";

const StyledLink = styled(Link)<{ $variant: "primary" | "secondary" }>`
  color: ${({ $variant, theme }) => theme.colors.text[$variant]};
  font-family: ${font.family.body};
  text-decoration: none;
`;

export default StyledLink;
