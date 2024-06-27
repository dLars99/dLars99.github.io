import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectLinks, { ProjectLink } from "../ProjectLinks";
import BarkeepDescription from "./BarkeepDescription";

const barkeepLinks: ProjectLink[] = [
  {
    name: "Barkeep Backend",
    url: "https://github.com/dLars99/barkeep",
    type: "github",
  },
  {
    name: "Barkeep Frontend",
    url: "https://github.com/dLars99/barkeep-frontend",
    type: "github",
  },
];

const Barkeep: FC = () => {
  console.log("Logic Placeholder");

  return (
    <Box>
      <ProjectLinks links={barkeepLinks} />

      <SimpleGrid columns={[1, 2]}>
        <BarkeepDescription />

        <Box>Screenshots</Box>
      </SimpleGrid>
    </Box>
  );
};

export default Barkeep;
