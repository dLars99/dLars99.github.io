import React, { FC } from "react";
import { Container, Text } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";
import { Header } from "../Layouts";
import ResumeJob from "./ResumeJob";
import { jobData } from "./jobData";

export interface WorkPageProps {}

const WorkPage: FC<WorkPageProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Section id="work">
      <Header title="Work" />
      <Text>Downloadable resume</Text>

      <Container as="article">
        {jobData.map((job) => (
          <ResumeJob job={job} />
        ))}
      </Container>
    </Section>
  );
};

export default WorkPage;
