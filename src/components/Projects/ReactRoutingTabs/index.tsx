import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RrtDescription from "./RrtDescription";

const ReactRoutingTabs: FC = () => {
  console.log("Logic Placeholder");

  return (
    <SimpleGrid columns={[1, 2]}>
      <Box>Demo</Box>

      <RrtDescription />
    </SimpleGrid>
  );
};

export default ReactRoutingTabs;
