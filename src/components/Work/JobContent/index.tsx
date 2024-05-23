import React, { FC } from "react";
import {
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Job } from "../jobData";

export interface JobContentProps {
  job: Job;
}

const dateFormat = "MMMM Y";

const JobContent: FC<JobContentProps> = ({ job }) => {
  const formattedStartDate = job.startDate
    ? format(job.startDate, dateFormat) + " - "
    : "Before ";
  const formattedEndDate = job.endDate
    ? format(job.endDate, dateFormat)
    : "Present";
  const formattedDates = formattedStartDate + formattedEndDate;

  return (
    <Container bg="whiteAlpha.500" mx="auto" p={6}>
      <Heading as="h4" fontSize="lg">
        {job.title}
      </Heading>
      <Text>{formattedDates}</Text>
      <Text>
        {job.location}
        {job.remote ? (
          <Text as="span" ml="0.25rem">
            (Remote)
          </Text>
        ) : null}
      </Text>
      <UnorderedList>
        {job.bulletPoints.map((bulletPoint) => (
          <ListItem key={bulletPoint.substring(8)}>{bulletPoint}</ListItem>
        ))}
      </UnorderedList>
    </Container>
  );
};

export default JobContent;
