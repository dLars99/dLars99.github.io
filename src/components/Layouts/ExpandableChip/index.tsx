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

export interface ExpandableChipProps {
  children?: ReactNode;
  name: string;
}

const ExpandableChip: FC<ExpandableChipProps> = ({ children, name }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box my={8}>
      <Flex
        alignItems="center"
        bg="background.transparent"
        px={6}
        py={4}
        justifyContent="space-between"
        width="100%"
      >
        <Heading as="h3" fontSize="2xl">
          {name}
        </Heading>

        <Button bg="transparent" onClick={onToggle}>
          {isOpen ? <FaWindowMinimize /> : <FaExpand />}
        </Button>
      </Flex>

      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};

export default ExpandableChip;
