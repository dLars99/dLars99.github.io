import React, { FC } from "react";
import { Box, Container, Text } from "@chakra-ui/react";

export const Bio: FC = () => (
  <Box>
    <Container>
      <Text>Small intro</Text>
    </Container>
    <Container>
      <Text>Specialties/Skills</Text>
    </Container>
    <Container>
      <Text>Past life</Text>
    </Container>
    <Container>
      <Text>Personal bit</Text>
    </Container>
  </Box>
);
