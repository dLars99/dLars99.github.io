import { extendTheme } from "@chakra-ui/react";
const theme = {
  colors: {
    primary: "green",
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
