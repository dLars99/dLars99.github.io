import React, { FC } from "react";
import { Container, Text } from "@chakra-ui/react";
import { Header } from "../../../../../src/layouts";

export const Intro: FC = () => (
  <Header title="David P Larsen">
    <Container as="article" p={0} px={1} mt={4} width={80}>
      <Text>Software developer. I connect users to data</Text>

      <Text>through robust APIs and</Text>

      <Text>intuitive interfaces.</Text>
    </Container>
  </Header>
);
