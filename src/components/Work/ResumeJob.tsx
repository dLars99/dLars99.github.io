import React, { FC, ReactNode, useState } from "react";
import { Box, Button, Collapse, Flex, Heading } from "@chakra-ui/react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";

export interface ResumeJobProps {
  children: ReactNode;
  title: string;
}

export const ResumeJob: FC<ResumeJobProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading as="h3">{title}</Heading>

        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaWindowMinimize /> : <FaExpand />}
        </Button>
      </Flex>

      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};

export default ResumeJob;
