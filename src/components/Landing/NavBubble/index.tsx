import React, { type FC, type HTMLAttributes } from "react";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";
import { useNavItems } from "./useNavItems";
import type { SystemStyleObject } from "../../../../styled-system/types";
import { css } from "../../../../styled-system/css";
import { styles } from "./navBubble.styles";

interface NavBubbleProps extends HTMLAttributes<HTMLDivElement> {
  navStyles: SystemStyleObject;
}

export const NavBubble: FC<NavBubbleProps> = ({ navStyles }) => {
  const { dimensions, ref } = useDimensions();
  // const breakpoint = useBreakpoint();
  const breakpoint = "lg";
  const navItems = useNavItems(breakpoint);

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
    <nav className={css(styles.nav, navStyles)} ref={ref}>
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
