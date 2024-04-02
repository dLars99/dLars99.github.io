import React, { FC } from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const Intro: FC = () => (
  <Box as="header" maxWidth="40%">
    <Container
      borderBottom="1px solid"
      borderColor="primary"
      borderRadius="42%"
      pb={3}
      textAlign="center"
      width={80}
    >
      <Heading as="h1" color="primary">
        David P Larsen
      </Heading>
    </Container>
    <Container as="article" p={0} px={1} mt={4} width={80}>
      <Text>Software developer. I connect users to data</Text>

      <Text>through robust APIs and</Text>

      <Text>intuitive interfaces.</Text>
    </Container>
  </Box>
);
