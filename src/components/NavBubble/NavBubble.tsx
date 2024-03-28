import React, { FC, useEffect, useRef, useState } from "react";
import { Box, BoxProps, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby-link";

const pointOnEllipse = (a: number, b: number, angle: number) => {
  const tan = Math.tan((angle * Math.PI) / 180);
  const aSquared = a * a;
  const bSquared = b * b;
  const tanSquared = tan * tan;
  const topOfEquation = a * b;
  const bottomOfXEquation = Math.sqrt(bSquared + aSquared * tanSquared);
  const x = topOfEquation / bottomOfXEquation;
  const bottomOfYEquation = Math.sqrt(aSquared + bSquared / tanSquared);
  const y = topOfEquation / bottomOfYEquation;
  return [x, y];
};

const NavBubble: FC<BoxProps> = ({ ...boxProps }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // TODO - allow resize
    const bubbleWidth = bubbleRef.current?.offsetWidth || 0;
    const bubbleHeight = bubbleRef.current?.offsetHeight || 0;
    setWidth(bubbleWidth);
    setHeight(bubbleHeight);
  }, []);

  const placeOnBubble = (angle: number) => {
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
      ref={bubbleRef}
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
