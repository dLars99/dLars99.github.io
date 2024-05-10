import React, { FC } from "react";
import { Header } from "../Layouts";
import { Bio } from "./Bio";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";

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
