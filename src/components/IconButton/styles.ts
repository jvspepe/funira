import { styled } from "styled-components";
import {
  FlexboxProps,
  GridProps,
  LayoutProps,
  compose,
  flexbox,
  grid,
  layout,
} from "styled-system";

const Styled = styled.button<FlexboxProps & GridProps & LayoutProps>`
  ${compose(flexbox, grid, layout)}
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem;
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export default Styled;
