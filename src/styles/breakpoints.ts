type Breakpoints = Array<string> & {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
};

const breakpoints: Breakpoints = [
  "641px",
  "769px",
  "1025px",
  "1281px",
  "1537px",
];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints.xxl = breakpoints[4];

export default breakpoints;
