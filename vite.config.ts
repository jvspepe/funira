import netlify from "@netlify/vite-plugin-tanstack-start";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [devtools(), netlify(), tanstackStart(), viteReact()],
  resolve: {
    alias: {
      // oxlint-disable-next-line unicorn/prefer-module
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

export default config;
