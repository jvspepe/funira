import "styled-components";
import { FontSizes } from "./styles/font-sizes";
import { Fonts } from "./styles/fonts";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      border: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
    fonts: Fonts;
    fontSizes: FontSizes;
  }
}
