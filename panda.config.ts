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
      keyframes: {
        slideDown: {
          "0%": { height: 0 },
          "100%": { height: "var(--radix-collapsible-content-height)" },
        },
        slideUp: {
          "0%": { height: "var(--radix-collapsible-content-height)" },
          "100%": { height: 0 },
        },
      },
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
        gradients: {
          DEFAULT: {
            value: "linear-gradient(to right bottom, #ffffff 20%, #a2af9f)",
          },
          ellipse: {
            base: {
              value:
                "radial-gradient(ellipse 100% 65%, #007699, #A2AF9F, #FFFFFF 85%)",
            },
            sm: {
              value:
                "radial-gradient(ellipse at right, #007699, #A2AF9F, #FFFFFF 85%)",
            },
          },
        },
      },
      textStyles,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
