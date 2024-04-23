import React, { FC } from "react";
import { Header } from "../Layouts";
import { Bio } from "./Bio";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";

const AboutPage: FC = () => {
  return (
    <Section>
      <Header id="about" title="About" />

      <SimpleGrid columns={2}>
        <Box />

        <Bio />
      </SimpleGrid>
    </Section>
  );
};

export default AboutPage;
