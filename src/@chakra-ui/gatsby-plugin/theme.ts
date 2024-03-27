import { extendTheme } from "@chakra-ui/react";
import "@fontsource/nunito-sans";

const theme = {
  colors: {
    primary: "#9FC97E",
    secondary: "#160C6E",
    black: "#141414",
    blue: {
      800: "#160C6E",
    },
    green: {
      200: "#9FC97E",
    },
    gray: {
      400: "#B7B3BD",
    },
  },
  fonts: {
    body: `'Nunito Sans', Arial, sans-serif`,
    heading: `'Nunito Sans', Arial, sans-serif`,
  },
  styles: {
    global: {
      a: {
        color: "blue.600",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
};

export default extendTheme(theme);

// gray: B7B3BD
// blue: 160C6E
// green: 9FC97E
// black: 141414
