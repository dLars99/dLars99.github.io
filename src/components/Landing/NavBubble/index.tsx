import React, { FC } from "react";
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  useBreakpoint,
} from "@chakra-ui/react";
import { useDimensions } from "./useDimensions";
import { pointOnEllipse } from "./coordinatesOnEllipse";
import { useNavItems } from "./useNavItems";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export const NavBubble: FC<BoxProps> = ({ ...boxProps }) => {
  const { dimensions, ref } = useDimensions();
  const breakpoint = useBreakpoint();
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

  return (
    <Box
      as="nav"
      borderRadius={[
        "40% 40% 40% 40% / 10% 10% 10% 10% ",
        "100% 0 0 100% / 50% 50% 50% 50%",
      ]}
      boxShadow="1px 1px 15px #A2AF9F"
      bg="radial-gradient(ellipse at bottom right, #007699, #A2AF9F, #FFFFFF 95%)"
      height={["120%", "100%"]}
      ref={ref}
      textAlign={["center", "left"]}
      width={["100%", "60%"]}
      {...boxProps}
    >
      <Box as="ul" role="menubar">
        {navItems.map((navItem, index) => (
          <Box
            as="li"
            borderRadius="50%"
            _hover={{
              backdropFilter: "blur(3px) saturate(3)",
            }}
            key={navItem.name}
            listStyleType="none"
            role="menuitem"
            position={["static", "absolute"]}
            mt={[8, 0]}
            sx={
              breakpoint !== "base" ? { ...placeOnBubble(navItem.angle) } : {}
            }
            transition="backdrop-filter 0.1s"
          >
            <ChakraLink
              as={AnchorLink}
              color="#004566"
              fontSize="3xl"
              fontWeight="black"
              _hover={{
                fontSize: "5xl",
              }}
              pl={[index === 2 ? 16 : 0, 0]}
              pr={[index === 1 ? 24 : 0, 0]}
              textTransform="capitalize"
              title={navItem.name}
              transition="font-size 0.1s"
              to={"/#" + navItem.name}
            >
              <span>{navItem.name}</span>
            </ChakraLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
