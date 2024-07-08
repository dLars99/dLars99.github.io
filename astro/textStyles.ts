import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  h2: {
    value: {
      fontFamily: "nunito",
      fontWeight: "bold",
      fontSize: ["3xl", "4xl"],
      lineHeight: [1.33, 1.2],
    },
  },
});
