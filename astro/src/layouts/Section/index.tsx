import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
};

export const Section: FC<SectionProps> = ({ children, id }) => (
  <Box
    as="section"
    id={id}
    height="100%"
    minHeight="100vh"
    position="relative"
    pt={16}
    pl={[0, 16]}
    width="100vw"
  >
    {children}
  </Box>
);
