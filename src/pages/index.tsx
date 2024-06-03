import React, { FC } from "react";
import { HeadFC, PageProps } from "gatsby";
import LandingPage from "../components/Landing";
import { Main } from "../components/Layouts";
import About from "../components/About";
import Work from "../components/Work";

const IndexPage: FC<PageProps> = () => {
  return (
    <Main>
      <LandingPage />

      <About />

      <Work />
    </Main>
  );
};

export const Head: HeadFC = () => (
  <title>David P Larsen: Javascript Software Engineer</title>
);

export default IndexPage;
