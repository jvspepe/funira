import styled from "styled-components";
import IconButton from "../IconButton";
import breakpoints from "../../styles/breakpoints";
import Menu from "../Menu";

const MobileButton = styled(IconButton)`
  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

const DesktopMenu = styled(Menu)`
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: block;
  }
`;

const DesktopButton = styled(IconButton)`
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: block;
  }
`;

export { MobileButton, DesktopMenu, DesktopButton };
