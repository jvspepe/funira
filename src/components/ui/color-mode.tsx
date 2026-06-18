"use client";

import type { IconButtonProps } from "@chakra-ui/react";
import type { ThemeProviderProps } from "next-themes";

import { ClientOnly, Icon, IconButton, Skeleton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { forwardRef } from "react";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();

  const themeValue = forcedTheme ?? resolvedTheme;

  const colorMode: ColorMode =
    themeValue === "dark" || themeValue === "light" ? themeValue : "light";

  function toggleColorMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();

  return colorMode === "dark" ? dark : light;
}

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        ref={ref}
        {...props}
      >
        <Icon size="sm">
          {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        </Icon>
      </IconButton>
    </ClientOnly>
  );
});
