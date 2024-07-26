import { styled } from "styled-components";
import { Props } from ".";

const Wrapper = styled.div`
  position: relative;
`;

const Dropdown = styled.div<{ $position: Props["position"] }>`
  position: absolute;
  min-width: 10rem;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  background-color: ${({ theme }) => theme.colors.background.primary};
  z-index: 10;
  top: calc(200% + 0.125rem);
  opacity: 0;
  visibility: hidden;
  transition: all 300ms ease-in-out;

  ${({ $position }) => {
    switch ($position) {
      case "left":
        return `
          left: 0;
        `;
      case "middle":
        return `
          left: 50%;
          transform: translateX(-50%);
        `;
      case "right":
        return `
          right: 0;
        `;
    }
  }}

  &[data-is-active="true"] {
    top: calc(100% + 0.125rem);
    opacity: 1;
    visibility: visible;
  }
`;

export { Wrapper, Dropdown };
