import React, { type FC, type HTMLAttributes } from "react";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";
import { useNavItems } from "./useNavItems";

interface NavBubbleProps extends HTMLAttributes<HTMLDivElement> {}

export const NavBubble: FC<NavBubbleProps> = ({ style: navStyles }) => {
  const { dimensions, ref } = useDimensions();
  // const breakpoint = useBreakpoint();
  const breakpoint = "lg";
  const navItems = useNavItems(breakpoint);

  const placeOnBubble = (angle: number) => {
    const [width, height] = dimensions;
    const halfHeight = height / 2;
    const [x, y] = pointOnEllipse(width, halfHeight, angle);
    return {
      bottom: `calc(${y}px + ${halfHeight}px - 3rem)`,
      right: `calc(${x}px - 5rem)`,
    };
  };

  // TODO: responsive nav styles
  // borderRadius: [
  //   "40% 40% 40% 40% / 10% 10% 10% 10% ",
  //   "100% 0 0 100% / 50% 50% 50% 50%",
  // ],
  // boxShadow: "1px 1px 15px #A2AF9F",
  // bg: [
  //   "radial-gradient(ellipse 100% 65%, #007699, #A2AF9F, #FFFFFF 85%)",
  //   "radial-gradient(ellipse at right, #007699, #A2AF9F, #FFFFFF 85%)",
  // ],
  // height: ["100%", "100%"],
  // textAlign: ["center", "left"],
  // width: ["100%", "60%"],

  // TODO: responsive li styles
  // borderRadius="50%"
  // _hover={{
  //   backdropFilter: "blur(3px) saturate(3)",
  // }}
  // listStyleType="none"
  // position={["static", "absolute"]}
  // mt={[8, 0]}
  // sx={
  //   breakpoint !== "base" ? { ...placeOnBubble(navItem.angle) } : {}
  // }
  // transition="backdrop-filter 0.1s"

  // TODO: a styles
  // color="#004566"
  // fontSize="3xl"
  // fontWeight="black"
  // _hover={{
  //   fontSize: "5xl",
  // }}
  // pl={[index === 2 ? 16 : 0, 0]}
  // pr={[index === 1 ? 24 : 0, 0]}
  // textTransform="capitalize"
  // title={navItem.name}
  // transition="font-size 0.1s"

  return (
    <nav
      ref={ref}
      style={{
        borderRadius: "100% 0 0 100% / 50% 50% 50% 50%",
        boxShadow: "1px 1px 15px #A2AF9F",
        background:
          "radial-gradient(ellipse at right, #007699, #A2AF9F, #FFFFFF 85%)",
        height: "100%",
        textAlign: "left",
        width: "60%",
        ...navStyles,
      }}
    >
      <ul role="menubar">
        {navItems.map((navItem, index) => (
          <li
            key={navItem.name}
            role="menuitem"
            style={{
              borderRadius: "50%",
              // "&:hover": {
              //   backdropFilter: "blur(3px) saturate(3)",
              // },
              listStyleType: "none",
              position: "absolute",
              marginTop: 0,
              transition: "backdrop-filter 0.1s",
              ...placeOnBubble(navItem.angle),
            }}
          >
            <a
              style={{
                color: "#004566",
                fontSize: "1.875rem",
                fontWeight: "black",
                // _hover: {{
                //   fontSize: "5xl",
                // }}
                paddingLeft: 0,
                paddingRight: 0,
                textTransform: "capitalize",
                transition: "font-size 0.1s",
              }}
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
