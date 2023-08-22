import { DefaultTheme } from "styled-components";
import typography from "../typography";

const light: DefaultTheme = {
  colors: {
    background: { primary: "#FFFFFF", secondary: "#F9F9F9" },
    border: { primary: "#EBE8F4", secondary: "#CAC6DA" },
    text: { primary: "#2A254B", secondary: "#726E8D" },
  },
  typography,
};

export default light;
