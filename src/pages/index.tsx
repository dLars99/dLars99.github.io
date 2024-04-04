import React, { FC } from "react";
import { HeadFC, PageProps } from "gatsby";
import { Intro, NavBubble } from "../components/Homepage";
import { Main } from "../components/Layouts";

const IndexPage: FC<PageProps> = () => {
  return (
    <Main>
      <Intro />

      <NavBubble position="absolute" bottom={0} right={0} />
    </Main>
  );
};

export const Head: HeadFC = () => (
  <title>David P Larsen: Javascript Software Engineer</title>
);

export default IndexPage;
