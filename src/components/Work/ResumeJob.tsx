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
    <Box my={8}>
      <Flex
        alignItems="center"
        bg="background.transparent"
        px={6}
        py={4}
        justifyContent="space-between"
      >
        <Heading as="h3" fontSize="xl">
          {title}
        </Heading>

        <Button bg="transparent" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaWindowMinimize /> : <FaExpand />}
        </Button>
      </Flex>

      <Collapse in={isOpen}>
        <Box bg="whiteAlpha.500" mx="auto" p={6} w="95%">
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ResumeJob;
