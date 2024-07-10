import { css } from "../../../../styled-system/css";

export const styles = {
  nav: css.raw({
    borderRadius: [
      "40% 40% 40% 40% / 10% 10% 10% 10%",
      "100% 0 0 100% / 50% 50% 50% 50%",
    ],
    boxShadow: "1px 1px 15px #A2AF9F",
    bg: [
      "radial-gradient(ellipse 100% 65%, #007699, #A2AF9F, #FFFFFF 85%)",
      "radial-gradient(ellipse at right, #007699, #A2AF9F, #FFFFFF 85%)",
    ],
    height: "100%",
    textAlign: ["center", "left"],
    width: ["100%", "60%"],
  }),
  li: css.raw({
    borderRadius: "50%",
    "&:hover": {
      backdropFilter: "blur(3px) saturate(3)",
    },
    listStyleType: "none",
    position: ["static", "absolute"],
    mt: [8, 0],
    transition: "backdrop-filter 0.1s",
  }),
  a: (index: number) =>
    css.raw({
      color: "#004566",
      fontSize: "3xl",
      fontWeight: "black",
      "&:hover": {
        fontSize: "5xl",
      },
      pl: [index === 2 ? 16 : 0, 0],
      pr: [index === 1 ? 24 : 0, 0],
      textTransform: "capitalize",
      transition: "font-size 0.1s",
    }),
};
