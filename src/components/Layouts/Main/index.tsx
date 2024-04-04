import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Main: FC<LayoutProps> = ({ children }) => (
  <Box
    as="main"
    bgGradient="linear(to-br, #FFFFFF 40%, #A2AF9F)"
    height="100vh"
    pt={16}
    pl={[0, 16]}
    width="100vw"
  >
    {children}
  </Box>
);
