import React, { FC } from "react";
import { HeadFC, PageProps } from "gatsby";

import About from "../components/About";
import Work from "../components/Work";
import Projects from "../../../src/components/Projects/Projects.astro";

const IndexPage: FC<PageProps> = () => {
  return (
    <Main>
      <LandingPage />

      <About />

      <Work />

      <Projects />
    </Main>
  );
};

export const Head: HeadFC = () => (
  <title>David P Larsen: Javascript Software Engineer</title>
);

export default IndexPage;
