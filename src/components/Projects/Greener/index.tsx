import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectLinks, { ProjectLink } from "../ProjectLinks";
import GreenerDescription from "./GreenerDescription";

const greenerLinks: ProjectLink[] = [
  {
    name: "Greener - NSS Frontend Capstone",
    url: "https://github.com/dLars99/greener",
    type: "github",
  },
];

const Greener: FC = () => {
  console.log("Logic Placeholder");

  return (
    <Box>
      <ProjectLinks links={greenerLinks} />

      <SimpleGrid columns={[1, 2]}>
        <Box>Screenshots</Box>

        <GreenerDescription />
      </SimpleGrid>
    </Box>
  );
};

export default Greener;
