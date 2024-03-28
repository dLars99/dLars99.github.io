import React, { FC } from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import NavBar from "../components/NavBar/NavBar";
import Summary from "../components/Summary/Summary";
import Skills from "../components/Skills/Skills";
import { Box, Divider } from "@chakra-ui/layout";
import Contact from "../components/Contact/Contact";
import NavBubble from "../components/NavBubble/NavBubble";

const IndexPage: FC<PageProps> = () => {
  return (
    <Box as="main" height="100vh" py={8} width="100vw">
      {/* <NavBar /> */}

      <Summary />

      <Divider my={4} />

      {/* <Skills /> */}

      {/* <Divider my={4} /> */}

      <Contact />
      <NavBubble position="absolute" bottom={0} right={0} />
    </Box>
  );
};

export const Head: HeadFC = () => <title>Home Page</title>;

export default IndexPage;
