import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RrtDescription from "./RrtDescription";
import ProjectLinks, { ProjectLink } from "../ProjectLinks";

const rrtLinks: ProjectLink[] = [
  {
    name: "React Routing Tabs",
    url: "https://www.npmjs.com/package/react-routing-tabs",
    type: "npm",
  },
  {
    name: "React Routing Tabs",
    url: "https://github.com/dLars99/react-routing-tabs",
    type: "github",
  },
];

const ReactRoutingTabs: FC = () => {
  console.log("Logic Placeholder");

  return (
    <Box>
      <ProjectLinks links={rrtLinks} />

      <SimpleGrid columns={[1, 2]}>
        <Box>Demo</Box>

        <RrtDescription />
      </SimpleGrid>
    </Box>
  );
};

export default ReactRoutingTabs;
