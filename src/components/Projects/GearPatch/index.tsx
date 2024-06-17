import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectLinks, { ProjectLink } from "../ProjectLinks";
import GearPatchDescription from "./GearPatchDescription";

const gearPatchLinks: ProjectLink[] = [
  {
    name: "GearPatch - NSS Final Capstone",
    url: "https://github.com/dLars99/GearPatch",
    type: "github",
  },
];

const GearPatch: FC = () => {
  console.log("Logic Placeholder");

  return (
    <Box>
      <ProjectLinks links={gearPatchLinks} />

      <SimpleGrid columns={[1, 2]}>
        <Box>Screenshots</Box>

        <GearPatchDescription />
      </SimpleGrid>
    </Box>
  );
};

export default GearPatch;
