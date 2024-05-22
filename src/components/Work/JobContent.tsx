import React, { FC } from "react";
import { Job } from "./jobData";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { format } from "date-fns";

export interface JobContentProps {
  job: Job;
}

const dateFormat = "MMMM Y";
const JobContent: FC<JobContentProps> = ({ job }) => {
  const formattedEndDate = job.endDate
    ? format(job.endDate, dateFormat)
    : "Present";
  const formattedDates =
    format(job.startDate, dateFormat) + " - " + formattedEndDate;

  return (
    <>
      <Text>{job.title}</Text>
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
    </>
  );
};

export default JobContent;
