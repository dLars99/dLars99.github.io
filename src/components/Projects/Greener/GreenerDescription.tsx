import React from "react";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const GreenerDescription = () => (
  <Box pr={[12, 16]}>
    <Text>Initial completion: August 2020</Text>

    <Text>Helping you grow a greener lawn</Text>

    <Box>
      <Text>
        Greener is designed for personal use for individuals who want to keep
        better track of their lawn care. Features include:
      </Text>

      <UnorderedList>
        <ListItem>Log for tracking lawn care chores</ListItem>

        <ListItem>
          Fully-automated schedule of seasonal tasks with reminders
        </ListItem>

        <ListItem>Weather data and alerts</ListItem>

        <ListItem>
          Precipitation monitoring to let the user know if water is needed
        </ListItem>

        <ListItem>Tips and tricks for a greener lawn</ListItem>
      </UnorderedList>

      <Text>
        This was my frontend capstone at Nashville Software School. The full
        application was built with a mobile-first design in about two weeks.
      </Text>
    </Box>

    <Text>React / Javascript</Text>
  </Box>
);

export default GreenerDescription;
