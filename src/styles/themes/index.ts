import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react';

const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '80rem',
};

const containerRecipe = defineRecipe({
  base: {
    maxWidth: {
      ...breakpoints,
    },
    paddingX: {
      base: '{spacing.6}',
      md: '0',
    },
  },
});

const linkRecipe = defineRecipe({
  variants: {
    variant: {
      plain: {
        _currentPage: {
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          textDecorationColor: 'currentColor/20',
        },
      },
    },
  },
});

const config = defineConfig({
  theme: {
    breakpoints,
    recipes: {
      container: containerRecipe,
      link: linkRecipe,
    },
    tokens: {},
  },
});

const theme = createSystem(defaultConfig, config);

export default theme;
