import React, { FC } from "react";
import { Section } from "../../../../src/layouts/Section/Section.astro";
import { Intro } from "./Intro";
import { NavBubble } from "./NavBubble";

const LandingPage: FC = () => {
  return (
    <Section>
      <Intro />

      <NavBubble position="absolute" bottom="-50%" right={0} />
    </Section>
  );
};

export default LandingPage;
