import React, { FC } from "react";
import { Section } from "../Layouts/Section";
import { Intro } from "./Intro";
import { NavBubble } from "./NavBubble";

const LandingPage: FC = () => {
  return (
    <Section>
      <Intro />

      <NavBubble position="absolute" bottom={0} right={0} />
    </Section>
  );
};

export default LandingPage;
