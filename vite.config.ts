import path from "node:path";

import netlify from "@netlify/vite-plugin-tanstack-start";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import neon from "./neon-vite-plugin.ts";

const config = defineConfig({
  plugins: [devtools(), netlify(), neon, tanstackStart(), viteReact()],
  resolve: {
    alias: {
      // oxlint-disable-next-line unicorn/prefer-module
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

export default config;
