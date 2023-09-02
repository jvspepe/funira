import { styled } from "styled-components";
import { Props } from ".";

const Wrapper = styled.div`
  position: relative;
`;

const Dropdown = styled.div<{ $position: Props["position"] }>`
  overflow: hidden;
  position: absolute;

  width: 100%;
  min-width: 7.5rem;

  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.colors.background.primary};
  z-index: 1000;
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
