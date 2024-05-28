import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => (
  <Box
    as="main"
    bgGradient="linear(to-br, #FFFFFF 20%, #A2AF9F)"
    height="100%"
    minHeight="100vh"
    pb="3rem"
    width="100vw"
  >
    {children}
  </Box>
);
