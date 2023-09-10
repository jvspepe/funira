import { styled } from "styled-components";
import { Sizes, Variants } from ".";

const Styled = styled.button<{ $variant: Variants; $size: Sizes }>`
  border: none;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export default Styled;
