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
    angle: 28,
  },
  {
    name: "projects",
    angle: 58,
  },
];

export const NavBubble: FC<BoxProps> = ({ ...boxProps }) => {
  const { dimensions, ref } = useDimensions();

  const placeOnBubble = (angle: number) => {
    const [width, height] = dimensions;
    const [x, y] = pointOnEllipse(width, height, angle);
    return {
      bottom: `calc(${y}px - 3rem)`,
      right: `calc(${x}px - 5rem)`,
    };
  };

  return (
    <Box
      as="nav"
      borderRadius="100% 0 0 0"
      boxShadow="1px 1px 15px #A2AF9F"
      bg="radial-gradient(ellipse at bottom right, #007699, #A2AF9F, #FFFFFF 85%)"
      ref={ref}
      height="50%"
      width="60%"
      {...boxProps}
    >
      <Box as="ul" role="menubar">
        {navItems.map((navItem) => (
          <Box
            as="li"
            borderRadius="50%"
            _hover={{
              backdropFilter: "blur(3px) saturate(3)",
            }}
            listStyleType="none"
            role="menuitem"
            position="absolute"
            sx={{ ...placeOnBubble(navItem.angle) }}
            transition="backdrop-filter 0.1s"
          >
            <ChakraLink
              as={GatsbyLink}
              color="#004566"
              fontSize="3xl"
              fontWeight="black"
              _hover={{
                fontSize: "5xl",
              }}
              textTransform="capitalize"
              transition="font-size 0.1s"
              to={"/" + navItem.name}
            >
              {navItem.name}
            </ChakraLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
