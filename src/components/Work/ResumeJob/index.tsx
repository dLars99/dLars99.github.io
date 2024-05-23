import React, { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";
import { Job } from "../jobData";
import JobContent from "../JobContent";

export interface ResumeJobProps {
  children?: ReactNode;
  job: Job;
}

const ResumeJob: FC<ResumeJobProps> = ({ children, job }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box my={8}>
      <Flex
        alignItems="center"
        bg="background.transparent"
        px={6}
        py={4}
        justifyContent="space-between"
        width={"64ch"}
      >
        <Heading as="h3" fontSize="2xl">
          {job.name}
        </Heading>

        <Button bg="transparent" onClick={onToggle}>
          {isOpen ? <FaWindowMinimize /> : <FaExpand />}
        </Button>
      </Flex>

      <Collapse
        // animateOpacity={false}
        in={isOpen}
        transition={{ enter: { height: { duration: 5 } } }}
      >
        {children}

        <JobContent job={job} />
      </Collapse>
    </Box>
  );
};

export default ResumeJob;
