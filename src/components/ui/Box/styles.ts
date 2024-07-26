import { styled } from "styled-components";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  space,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

export type BoxProps = BackgroundProps &
  BorderProps &
  ColorProps &
  FlexboxProps &
  GridProps &
  LayoutProps &
  PositionProps &
  SpaceProps;

const Styles = styled.p.withConfig({ shouldForwardProp })<BoxProps>`
  ${compose(background, border, color, flexbox, grid, layout, position, space)}
`;

export default Styles;
