import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
};

export const Section: FC<SectionProps> = ({ children, id }) => (
  <Box
    as="section"
    height="100vh"
    id={id}
    position="relative"
    pt={16}
    pl={[0, 16]}
    width="100vw"
  >
    {children}
  </Box>
);
