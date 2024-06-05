import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";
import { Header } from "../Layouts";
import ExpandableChip from "../Layouts/ExpandableChip";

export interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Section id="projects">
      <Header title="Projects" />

      <Box as="article" mx="auto" maxWidth="64ch" width="100%">
        <ExpandableChip name="React Routing Tabs">
          <h1>Hi!</h1>
        </ExpandableChip>

        <ExpandableChip name="Barkeep">
          <h1>Hi!</h1>
        </ExpandableChip>

        <ExpandableChip name="GearPatch">
          <h1>Hi!</h1>
        </ExpandableChip>

        <ExpandableChip name="Greener">
          <h1>Hi!</h1>
        </ExpandableChip>
      </Box>
    </Section>
  );
};

export default ProjectPage;
