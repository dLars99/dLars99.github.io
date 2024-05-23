import React, { FC } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
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

      <Box as="article" mx="auto" maxWidth="64ch" width="100%">
        {jobData.map((job) => (
          <ResumeJob job={job} key={job.name} />
        ))}
      </Box>
    </Section>
  );
};

export default WorkPage;
