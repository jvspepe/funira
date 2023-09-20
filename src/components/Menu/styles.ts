import { styled } from "styled-components";
import { Props } from ".";
import { LayoutProps, layout } from "styled-system";

const Wrapper = styled.div<LayoutProps>`
  ${layout}
  position: relative;
`;

const Dropdown = styled.div<{ $position: Props["position"] }>`
  /* overflow: hidden; */
  position: absolute;
  min-width: 10rem;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  z-index: 10;
  top: calc(100% + 0.125rem);
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
`;

export { Wrapper, Dropdown };
