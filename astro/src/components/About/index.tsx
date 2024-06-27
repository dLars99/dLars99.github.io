import React, { FC } from "react";
import { Header } from "../../../../src/layouts";
import { Bio } from "./Bio/Bio.astro";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Section } from "../../../../src/layouts/Section/Section.astro";

const AboutPage: FC = () => {
  return (
    <Section id="about">
      <Header title="About" />

      <SimpleGrid columns={[1, 2]}>
        <Box />

        <Bio />
      </SimpleGrid>
    </Section>
  );
};

export default AboutPage;
