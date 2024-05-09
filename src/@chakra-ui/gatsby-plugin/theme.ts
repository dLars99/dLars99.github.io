import { extendTheme } from "@chakra-ui/react";
import "@fontsource/nunito-sans";

const theme = {
  // colors: {
  //   primary: "#9FC97E",
  //   secondary: "#160C6E",
  //   black: "#141414",
  //   blue: {
  //     800: "#160C6E",
  //   },
  //   green: {
  //     200: "#9FC97E",
  //   },
  //   gray: {
  //     400: "#B7B3BD",
  //   },
  // },
  colors: {
    primary: "#08430E",
    secondary: "#A2AF9F",
    background: {
      transparent: "rgb(235, 250, 255, 0.5)",
    },
    blue: {
      100: "#EBFAFF",
      300: "#007699",
      600: "#004566",
    },
    gray: {
      200: "#A2AF9F",
      400: "#6E7A6C",
    },
    green: {
      700: "#08430E",
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
        // _hover: {
        //   textDecoration: "underline",
        // },
      },
    },
  },
};

export default extendTheme(theme);

// gray: B7B3BD
// blue: 160C6E
// green: 9FC97E
// black: 141414

// Alternate
// green: #08430E
// lt gray: #A2AF9F
// dark gray: #6E7A6C
// blue: #004566
// lt blue: #007699
