import React, { FC } from "react";
import { Box, Container, Link } from "@chakra-ui/react";
import { Section } from "../../../../src/layouts/Section/Section.astro";
import { Header } from "../../../../src/layouts";
import ResumeJob from "./ResumeJob";
import { jobData } from "./jobData";
import resume from "../../assets/files/David Larsen Resume Downloadable.pdf";

export interface WorkPageProps {}

const WorkPage: FC<WorkPageProps> = ({}) => {
  console.log("Logic Placeholder");

  return (
    <Section id="work">
      <Header title="Work" />
      <Box maxWidth={["100%", "40%"]} mt={3}>
        <Container textAlign="center" width={80}>
          <Link href={resume} download color="blue.600">
            Downloadable resume
          </Link>
        </Container>
      </Box>

      <Box as="article" mx="auto" maxWidth="64ch" width="100%">
        {jobData.map((job) => (
          <ResumeJob job={job} key={job.name} />
        ))}
      </Box>
    </Section>
  );
};

export default WorkPage;
