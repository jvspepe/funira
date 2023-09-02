import { css, styled } from "styled-components";
import font from "../../styles/font";
import { Props } from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label<{ $showLabel: Props["showLabel"] }>`
  color: white;
  font-family: ${font.family.body};

  ${({ $showLabel }) => {
    if ($showLabel) {
      return css`
        width: fit-content;
        color: white;
      `;
    } else {
      return css`
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      `;
    }
  }}
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Input = styled.input<{ $variant: Props["variant"] }>`
  border: none;
  width: 100%;
  padding: 1rem 2rem;

  color: ${({ $variant, theme }) =>
    $variant === "primary"
      ? `${theme.colors.text.primary}`
      : `${theme.colors.text.tertiary}`};

  background-color: ${({ $variant, theme }) =>
    $variant === "primary"
      ? `${theme.colors.background.primary}`
      : "rgba(255, 255, 255, 0.15)"};
  font-family: ${font.family.body};

  &::placeholder {
    opacity: 0.5;
  }
`;

const HelperText = styled.span`
  color: white;
  font-size: ${font.size.sm};
  font-family: ${font.family.body};
`;

export { Wrapper, Label, InputWrapper, Input, HelperText };
