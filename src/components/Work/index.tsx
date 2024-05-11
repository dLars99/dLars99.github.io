import React, { FC } from "react";
import { Collapse, Container, Text } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";
import { Header } from "../Layouts";
import ResumeJob from "./ResumeJob";

export interface WorkPageProps {}

export const WorkPage: FC<WorkPageProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Section id="work">
      <Header title="Work" />
      <Text>Downloadable resume</Text>

      <Container as="article">
        <ResumeJob title="Little Caesars">Content</ResumeJob>
        <ResumeJob title="FanPower (formerly Pickup)">Content</ResumeJob>
        <ResumeJob title="SAFE Health">Content</ResumeJob>
        <ResumeJob title="Nashville Software School">Content</ResumeJob>
        <ResumeJob title="Earlier Experiences">Content</ResumeJob>
      </Container>
    </Section>
  );
};

export default WorkPage;
