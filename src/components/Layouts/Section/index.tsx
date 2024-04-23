import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

export const Section: FC<SectionProps> = ({ children }) => (
  <Box
    as="section"
    height="100vh"
    position="relative"
    pt={16}
    pl={[0, 16]}
    width="100vw"
  >
    {children}
  </Box>
);
