import { Box, Button, Collapse, Flex, Heading } from "@chakra-ui/react";
import React, { FC, ReactNode, useState } from "react";

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

        <Button onClick={() => setIsOpen(!isOpen)}>Open!</Button>
      </Flex>

      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};

export default ResumeJob;
