import { styled } from "styled-components";
import {
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  SpaceProps,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

type Props = FlexboxProps &
  LayoutProps &
  SpaceProps &
  TypographyProps & {
    $variant: "primary" | "secondary";
  };

const Styles = styled.p.withConfig({ shouldForwardProp })<Props>`
  ${compose(flexbox, layout, space, typography)}
  color: ${({ $variant, theme }) => theme.colors.text[$variant]};
  text-decoration: none;
`;

Styles.defaultProps = {
  fontFamily: "body",
  fontSize: "md",
  fontWeight: "normal",
};

export default Styles;
