import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RrtDescription from "./RrtDescription";
import RrtLinks from "./RrtLinks";

const ReactRoutingTabs: FC = () => {
  console.log("Logic Placeholder");

  return (
    <Box>
      <RrtLinks />
      <SimpleGrid columns={[1, 2]}>
        <Box>Demo</Box>

        <RrtDescription />
      </SimpleGrid>
    </Box>
  );
};

export default ReactRoutingTabs;
