import "styled-components";

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
  }
}
