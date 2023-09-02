import { Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import font from "../../styles/font";

const StyledLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${font.family.body};
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: left;
    background-color: ${({ theme }) => theme.colors.text.secondary};
    transition: transform 200ms;
  }

  &:hover::after,
  &:focus::after,
  &.active::after {
    transform: scaleX(1);
  }
`;

export default StyledLink;
