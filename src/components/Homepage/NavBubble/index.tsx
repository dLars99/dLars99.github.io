import React, { FC } from "react";
import { Box, BoxProps, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby-link";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";

const navItems = [
  {
    name: "about",
    angle: 12,
  },
  {
    name: "work",
    angle: 30,
  },
  {
    name: "projects",
    angle: 60,
  },
];

export const NavBubble: FC<BoxProps> = ({ ...boxProps }) => {
  const { dimensions, ref } = useDimensions();

  const placeOnBubble = (angle: number) => {
    const [width, height] = dimensions;
    const [x, y] = pointOnEllipse(width, height, angle);
    return {
      bottom: `calc(${y}px - 2rem)`,
      right: `calc(${x}px - 4rem)`,
    };
  };

  return (
    <Box
      borderRadius="100% 0 0 0"
      bg="secondary"
      ref={ref}
      height="50%"
      width="60%"
      {...boxProps}
    >
      {navItems.map((navItem) => (
        <Box position="absolute" sx={{ ...placeOnBubble(navItem.angle) }}>
          <ChakraLink
            as={GatsbyLink}
            fontSize="3xl"
            fontWeight="black"
            _hover={{
              fontSize: "5xl",
            }}
            textTransform="capitalize"
            transition="font-size 0.2s ease-in-out"
            to={"/" + navItem.name}
          >
            {navItem.name}
          </ChakraLink>
        </Box>
      ))}
    </Box>
  );
};
