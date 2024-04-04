import React, { FC } from "react";
import { HeadFC, PageProps } from "gatsby";
import { Header, Main } from "../components/Layouts";
import { Bio } from "../components/Bio";
import { Box, SimpleGrid } from "@chakra-ui/react";

const AboutPage: FC<PageProps> = () => {
  return (
    <Main>
      <Header title="About" />

      <SimpleGrid columns={2}>
        <Box />

        <Bio />
      </SimpleGrid>
    </Main>
  );
};

export const Head: HeadFC = () => <title>David P Larsen: Info</title>;

export default AboutPage;
