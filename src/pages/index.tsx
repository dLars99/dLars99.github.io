import React, { FC } from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { Intro, NavBubble } from "../components/Homepage";
import { Box } from "@chakra-ui/layout";

const IndexPage: FC<PageProps> = () => {
  return (
    <Box
      as="main"
      bgGradient="linear(to-br, #FFFFFF 40%, #A2AF9F)"
      height="100vh"
      pt={16}
      pl={[0, 16]}
      width="100vw"
    >
      <Intro />

      <NavBubble position="absolute" bottom={0} right={0} />
    </Box>
  );
};

export const Head: HeadFC = () => (
  <title>David P Larsen: Javascript Software Engineer</title>
);

export default IndexPage;
