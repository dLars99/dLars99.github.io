import { Box, Container, Heading } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
  title: string;
};

export const Header: FC<HeaderProps> = ({ children, title }) => (
  <Box as="header" maxWidth={["100%", "40%"]}>
    <Container
      borderBottom="1px solid"
      borderColor="primary"
      borderRadius="42%"
      pb={3}
      textAlign="center"
      width={80}
    >
      <Heading as="h1" color="primary">
        {title}
      </Heading>
    </Container>
    {children}
  </Box>
);
