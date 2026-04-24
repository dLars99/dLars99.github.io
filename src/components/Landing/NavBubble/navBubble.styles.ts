import { css } from "../../../../styled-system/css";

export const styles = {
  nav: css.raw({
    borderRadius: [
      "40% 40% 40% 40% / 10% 10% 10% 10%",
      "100% 0 0 100% / 50% 50% 50% 50%",
    ],
    backdropFilter: ["blur(10px)", "blur(16px) saturate(1.5)"],
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow:
      "0 4px 24px rgba(0, 118, 153, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
    bg: ["{gradients.ellipse.base}", "{gradients.ellipse.sm}"],
    height: "100%",
    textAlign: ["center", "left"],
    width: ["100%", "60%"],
  }),
  li: css.raw({
    borderRadius: "50%",
    "&:hover": {
      backdropFilter: ["none", "none", "blur(3px) saturate(3)"],
      opacity: 1,
      transform: ["none", "none", "scale(1.06)"],
    },
    listStyleType: "none",
    opacity: 0.82,
    position: ["static", "absolute"],
    mt: [8, 0],
    transform: ["none", "none", "scale(0.95)"],
    transition: "backdrop-filter 0.2s, opacity 0.2s, transform 0.2s",
  }),
  a: (index: number) =>
    css.raw({
      color: "blue.600",
      filter: "blur(0.7px) saturate(0.6) brightness(0.88)",
      fontSize: "3xl",
      fontWeight: "black",
      "&:hover": {
        filter: "drop-shadow(0 3px 12px rgba(0, 118, 153, 0.5))",
        fontSize: ["3xl", "3xl", "5xl"],
      },
      pl: [index === 2 ? 16 : 0, 0],
      pr: [index === 1 ? 24 : 0, 0],
      textTransform: "capitalize",
      transition: "filter 0.2s, font-size 0.1s",
    }),
};
