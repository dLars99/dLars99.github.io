import React, { FC, ReactNode } from "react";
import { Container, ContainerProps, Text } from "@chakra-ui/react";

interface BioBlockProps extends ContainerProps {
  children: ReactNode;
}

export const BioBlock: FC<ContainerProps> = ({
  children,
  ...containerProps
}) => (
  <Container mb={4} {...containerProps}>
    {children}
  </Container>
);
