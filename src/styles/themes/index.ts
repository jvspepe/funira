import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineTokens,
} from "@chakra-ui/react";

const breakpoints = {
  "2xl": "80rem",
  lg: "64rem",
  md: "48rem",
  sm: "40rem",
  xl: "80rem",
};

const sizes = defineTokens.sizes({
  "22": { value: "5.75rem" },
});

const containerRecipe = defineRecipe({
  base: {
    maxWidth: {
      ...breakpoints,
    },
    paddingX: {
      base: "{spacing.6}",
      md: "0",
    },
  },
});

const linkRecipe = defineRecipe({
  variants: {
    variant: {
      plain: {
        _currentPage: {
          textDecoration: "underline",
          textDecorationColor: "currentColor/20",
          textUnderlineOffset: "3px",
        },
      },
    },
  },
});

const config = defineConfig({
  globalCss: {
    ".firebase-emulator-warning": {
      display: "none",
    },
  },
  theme: {
    breakpoints,
    recipes: {
      container: containerRecipe,
      link: linkRecipe,
    },
    tokens: {
      sizes,
    },
  },
});

const theme = createSystem(defaultConfig, config);

export default theme;
