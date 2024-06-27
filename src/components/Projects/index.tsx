import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";
import { Header } from "../Layouts";
import ExpandableChip from "../Layouts/ExpandableChip";
import ReactRoutingTabs from "./ReactRoutingTabs";
import Barkeep from "./Barkeep";
import GearPatch from "./GearPatch";
import Greener from "./Greener";

const ProjectPage: FC = () => (
  <Section id="projects">
    <Header title="Projects" />

    <Box as="article" mx="auto" width="100%">
      <ExpandableChip name="React Routing Tabs">
        <ReactRoutingTabs />
      </ExpandableChip>

      <ExpandableChip name="Barkeep">
        <Barkeep />
      </ExpandableChip>

      <ExpandableChip name="GearPatch">
        <GearPatch />
      </ExpandableChip>

      <ExpandableChip name="Greener">
        <Greener />
      </ExpandableChip>
    </Box>
  </Section>
);

export default ProjectPage;
