import React, { FC } from "react";
import { HeadFC, PageProps } from "gatsby";
import LandingPage from "../components/Landing";
import { Main } from "../../../src/layouts";
import About from "../components/About";
import Work from "../components/Work";
import Projects from "../components/Projects";

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
