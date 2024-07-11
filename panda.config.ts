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
        colors: {
          primary: { value: "#08430E" },
          secondary: { value: "#A2AF9F" },
          background: {
            transparent: { value: "rgba(235, 250, 255, 0.5)" },
          },
          blue: {
            100: { value: "#EBFAFF" },
            300: { value: "#007699" },
            600: { value: "#004566" },
          },
          gray: {
            200: { value: "#A2AF9F" },
            400: { value: "#6E7A6C" },
          },
          green: {
            700: { value: "#08430E" },
          },
        },
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
