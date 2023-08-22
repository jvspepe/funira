import { DefaultTheme } from "styled-components/dist/types";

const typography: DefaultTheme["typography"] = {
  body: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  },
  font: {
    body: `"Montserrat Variable", sans-serif`,
    heading: `"Space Grotesk Variable", sans-serif`,
  },
  heading: {
    xs: "0.875rem",
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.25rem",
  },
  lineHeight: "150%",
};

export default typography;
