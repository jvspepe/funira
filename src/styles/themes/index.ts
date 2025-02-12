import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '641px',
  md: '769px',
  lg: '1025px',
  xl: '1281px',
  xxl: '1441px',
} as const;

const theme = extendTheme({ breakpoints });

export default theme;
