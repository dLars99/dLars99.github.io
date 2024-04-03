import { Center, Container, Heading } from "@chakra-ui/layout";
import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

const skillSet = [
  {
    name: "React",
    logo: "..",
    link: "https://www.react.com",
  },
];

const Skills: FC = () => {
  return (
    <Container as="section">
      <Center>
        <Heading as="h3" size="xl">
          Skills
        </Heading>
      </Center>
      {skillSet.map((skill) => (
        <a href={skill.link}>
          {/* <StaticImage alt={skill.name} src={skill.logo} /> */}
        </a>
      ))}
    </Container>
  );
};

export default Skills;
