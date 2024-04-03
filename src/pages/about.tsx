import React, { FC } from "react";
import { HeadFC, Link } from "gatsby";

const AboutPage: FC = () => {
  return (
    <main>
      <h1>About</h1>

      <Link to="/">Home</Link>

      <p>TODO: Fill this in with intriguing details</p>
    </main>
  );
};

export const Head: HeadFC = () => <title>About</title>;

export default AboutPage;
