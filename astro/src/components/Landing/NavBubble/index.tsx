import React, { useMemo, type FC, type HTMLAttributes } from "react";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";
import { useNavItems } from "./useNavItems";
import type { SystemStyleObject } from "../../../../styled-system/types";
import { css } from "../../../../styled-system/css";

interface NavBubbleProps extends HTMLAttributes<HTMLDivElement> {
  navStyles: SystemStyleObject;
}

const useNavStyles = (navStyles: SystemStyleObject) =>
  useMemo(
    () => ({
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
        ...navStyles,
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
    }),
    [navStyles]
  );

export const NavBubble: FC<NavBubbleProps> = ({ navStyles }) => {
  const { dimensions, ref } = useDimensions();
  // const breakpoint = useBreakpoint();
  const breakpoint = "lg";
  const navItems = useNavItems(breakpoint);
  const styles = useNavStyles(navStyles);

  const placeOnBubble = (angle: number) => {
    let bubbleStyles = {};
    if (breakpoint !== "base") {
      const [width, height] = dimensions;
      const halfHeight = height / 2;
      const [x, y] = pointOnEllipse(width, halfHeight, angle);
      bubbleStyles = {
        bottom: `calc(${y}px + ${halfHeight}px - 3rem)`,
        right: `calc(${x}px - 5rem)`,
      };
    }
    return bubbleStyles;
  };

  return (
    <nav className={css(styles.nav)} ref={ref}>
      <ul role="menubar">
        {navItems.map((navItem, index) => (
          <li
            className={css(styles.li)}
            key={navItem.name}
            role="menuitem"
            style={placeOnBubble(navItem.angle)}
          >
            <a
              className={css(styles.a(index))}
              href={"/#" + navItem.name}
              title={navItem.name}
            >
              {navItem.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
