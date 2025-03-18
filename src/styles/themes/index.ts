import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '90rem',
};

const config = defineConfig({
  theme: {
    breakpoints,
  },
});

const theme = createSystem(defaultConfig, config);

export default theme;
