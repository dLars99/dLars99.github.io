import React, { FC } from "react";
import {
  Box,
  Center,
  Link as ChakraLink,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/layout";
import { Link as GatsbyLink } from "gatsby-link";

const menuItems = [
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Resume",
    to: "/resume",
  },
];

const NavBar: FC = () => {
  return (
    <Box as="header" bg="primary" p={3}>
      <Center>
        <Heading as="h1">David P Larsen</Heading>
      </Center>

      <Center>
        <Text>Javascript Software Engineer</Text>
      </Center>

      <Center>
        <Box as="nav" mt={3} p={2} w="50%">
          <Grid as="ul" gap={4} templateColumns="repeat(2, 1fr)">
            {menuItems.map((menuItem) => (
              <GridItem
                as="li"
                bgColor="secondary"
                p={2}
                sx={{ listStyle: "none" }}
              >
                <Center>
                  <ChakraLink as={GatsbyLink} color="white" to={menuItem.to}>
                    {menuItem.label}
                  </ChakraLink>
                </Center>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Center>
    </Box>
  );
};

export default NavBar;
