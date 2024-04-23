import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => (
  <Box
    as="main"
    bgGradient="linear(to-br, #FFFFFF 20%, #A2AF9F)"
    minHeight="100vh"
    width="100vw"
  >
    {children}
  </Box>
);
