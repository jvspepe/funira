import { styled } from "styled-components";
import { Fonts, Sizes, Variants } from ".";
import font from "../../styles/font";

const Styles = styled.p<{ $variant: Variants; $font: Fonts; $size: Sizes }>`
  color: ${({ $variant, theme }) => theme.colors.text[$variant]};
  font-family: ${({ $font }) => font.family[$font]};
  font-size: ${({ $size }) => font.size[$size]};
  font-weight: normal;
  text-decoration: none;
`;

export default Styles;
