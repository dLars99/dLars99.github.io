import React, { FC, ReactNode } from "react";
import { Job } from "../jobData";
import JobContent from "../JobContent";
import ExpandableChip from "../../Layouts/ExpandableChip";

export interface ResumeJobProps {
  children?: ReactNode;
  job: Job;
}

const ResumeJob: FC<ResumeJobProps> = ({ children, job }) => {
  return (
    <ExpandableChip name={job.name}>
      {children}

      <JobContent job={job} />
    </ExpandableChip>
  );
};

export default ResumeJob;
