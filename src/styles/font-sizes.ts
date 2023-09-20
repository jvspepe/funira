export type FontSizes = Array<string> & {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
  "4xl"?: string;
};

const fontSizes: FontSizes = [
  "0.75rem", // 12px
  "0.875rem", // 14px
  "1rem", // 16px
  "1.125rem", // 18px
  "1.25rem", // 20px
  "1.5rem", // 24px
  "2rem", // 32px
  "2.25rem", // 36px
];

fontSizes.xs = fontSizes[0];
fontSizes.sm = fontSizes[1];
fontSizes.md = fontSizes[2];
fontSizes.lg = fontSizes[3];
fontSizes.xl = fontSizes[4];
fontSizes["2xl"] = fontSizes[5];
fontSizes["3xl"] = fontSizes[6];
fontSizes["4xl"] = fontSizes[7];

export default fontSizes;
