import { Box, Container, Heading } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
  id?: string;
  title: string;
};

export const Header: FC<HeaderProps> = ({ children, id, title }) => (
  <Box as="header" maxWidth={["100%", "40%"]}>
    <Container
      borderBottom="1px solid"
      borderColor="primary"
      borderRadius="42%"
      pb={3}
      textAlign="center"
      width={80}
    >
      <Heading as="h2" color="primary" id={id}>
        {title}
      </Heading>
    </Container>
    {children}
  </Box>
);
