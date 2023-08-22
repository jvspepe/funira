import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: { primary: string; secondary: string };
      border: { primary: string; secondary: string };
      text: { primary: string; secondary: string };
    };
    typography: {
      body: { sm: string; md: string; lg: string };
      font: { body: string; heading: string };
      heading: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      lineHeight: string;
    };
  }
}
