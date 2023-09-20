import { DefaultTheme } from "styled-components";
import fonts from "../fonts";
import fontSizes from "../font-sizes";

const light: DefaultTheme = {
  colors: {
    background: {
      primary: "#FAFAFA",
      secondary: "#F5F5F5",
      tertiary: "#2A254B",
    },
    border: {
      primary: "#EBE8F4",
      secondary: "#4E4D93",
      tertiary: "#DCDCDC",
    },
    text: {
      primary: "#2A254B",
      secondary: "#FAFAFA",
      tertiary: "#726E8D",
    },
  },
  fonts,
  fontSizes,
};

export default light;
