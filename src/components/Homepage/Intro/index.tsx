import React, { FC } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";

export const Intro: FC = () => (
  <Box maxWidth="40%">
    <Container
      borderBottom="1px solid"
      borderColor="primary"
      width="fit-content"
    >
      <Heading as="h1" color="primary">
        David P Larsen
      </Heading>
    </Container>
    <Container as="article" mt={4}>
      A more detailed professional summary will go here.
    </Container>
  </Box>
);
