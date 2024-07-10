import { defineConfig } from "@pandacss/dev";
import { textStyles } from "./textStyles";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,astro}",
    "./pages/**/*.{js,jsx,ts,tsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          nunito: { value: `'Nunito Sans', Arial, sans-serif` },
        },
      },
      textStyles,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
