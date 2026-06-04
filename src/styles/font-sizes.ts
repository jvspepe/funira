export interface FontSizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
  "4xl"?: string;
}

const fontSizes: FontSizes = {
  "2xl": "1.5rem", // 24px
  "3xl": "2rem", // 32px
  "4xl": "2.25rem", // 36px
  lg: "1.125rem", // 18px
  md: "1rem", // 16px
  sm: "0.875rem", // 14px
  xl: "1.25rem", // 20px
  xs: "0.75rem", // 12px
};

export default fontSizes;
