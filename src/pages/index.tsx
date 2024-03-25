import React, { FC } from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: FC<PageProps> = () => {
  return (
    <main>
      <h1>Portfolio Site Goes Here</h1>

      <Link to="/about">About</Link>

      <p>Todo: fill this in with real content</p>

      <StaticImage
        alt="David Larsen"
        src="../images/david-larsen-profile.jpg"
      />
    </main>
  );
};

export const Head: HeadFC = () => <title>Home Page</title>;

export default IndexPage;
