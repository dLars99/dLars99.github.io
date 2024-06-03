import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Section } from "../Layouts/Section";
import { Header } from "../Layouts";
import ResumeJob from "./ResumeJob";

export interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Section id="projects">
      <Header title="Projects" />

      <Box as="article" mx="auto" maxWidth="64ch" width="100%">
        {/* {jobData.map((job) => (
          <ResumeJob job={job} key={job.name} />
        ))} */}
      </Box>
    </Section>
  );
};

export default ProjectPage;
