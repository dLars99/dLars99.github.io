import React, { FC } from "react";
import { Box, BoxProps, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby-link";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";

const NavBubble: FC<BoxProps> = ({ ...boxProps }) => {
  const { dimensions, ref } = useDimensions();

  const placeOnBubble = (angle: number) => {
    const [width, height] = dimensions;
    const [x, y] = pointOnEllipse(width, height, angle);
    return {
      bottom: `calc(${y}px - 1rem)`,
      right: `calc(${x}px - 3rem)`,
    };
  };

  return (
    <Box
      borderRadius="100% 0 0 0"
      bg="secondary"
      ref={ref}
      height="60%"
      width="60%"
      {...boxProps}
    >
      <Box position="absolute" sx={{ ...placeOnBubble(60) }}>
        <ChakraLink as={GatsbyLink} fontSize="3xl" to="/about">
          About
        </ChakraLink>
      </Box>

      <Box position="absolute" sx={{ ...placeOnBubble(30) }}>
        <ChakraLink as={GatsbyLink} fontSize="3xl" to="/resume">
          Work
        </ChakraLink>
      </Box>

      <Box position="absolute" sx={{ ...placeOnBubble(12) }}>
        <ChakraLink as={GatsbyLink} fontSize="3xl" to="/resume">
          Projects
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default NavBubble;
