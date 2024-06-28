import React from "react";
import { Box, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const BarkeepDescription = () => (
  <Box pr={[12, 16]}>
    <Text>Initial completion: July 2022</Text>

    <Text>Last update: October 2022</Text>

    <Text>A cocktail catalog for personal use</Text>

    <Box>
      <Text>
        Several years ago, my wife got into mixology, especially tiki cocktails.
        A typical tiki drink includes many ingredients. This presents two
        challenges:
      </Text>

      <UnorderedList>
        <ListItem>
          Keeping track of drink recipes from many different sources
        </ListItem>
        <ListItem>
          Finding a recipe that matches the ingredients you have
        </ListItem>
      </UnorderedList>

      <Text>
        Barkeep is our in-home solution to these problems. At its core is a
        database of drink recipes we have collected. They can be searched by
        regular searches, but also filtered by one or more ingredients to find
        the right recipe for the moment.
      </Text>

      <Text>
        Since this is for my personal use, and due to legal implications around
        alcohol, it is not publicly deployed. I run this in a Docker container
        on a home
        <Link isExternal href="https://unraid.net" mx="0.25rem">
          UnRaid
        </Link>
        server.
      </Text>
    </Box>

    <Text>PostgreSQL, Javascript (Express API, React client)</Text>
  </Box>
);

export default BarkeepDescription;
