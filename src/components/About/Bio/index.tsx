import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { BioBlock } from "../BioBlock";

export const Bio: FC = () => (
  <Box mt={12}>
    <BioBlock>
      <Text>Hi. I'm David.</Text>
    </BioBlock>

    <BioBlock>
      <Text>
        I am a fullstack developer with over 4 years' experience developing
        professional applications utilizing JavaScript/Typescript frameworks.
      </Text>
    </BioBlock>

    <BioBlock>
      <Text>
        I have extensive experience using React for frontend development, along
        with a variety of styling frameworks. I also have experience developing
        backends in Node/Express, with a tiny bit of C#/.NET experience. I have
        utilized SQL and NoSQL databases, particularly through PostgreSQL and
        MongoDB.
      </Text>
    </BioBlock>

    <BioBlock>
      <Text>
        Before I was a developer, I split time between IT Support and
        professional music, including 5 years pursuing music full-time. Support
        gave me a superb troubleshooting and problem solving skills. Music gave
        me the creative itch to move beyond support into development.
      </Text>
    </BioBlock>

    <BioBlock>
      <Text>
        I also love to disconnect with a good book or by getting outdoors or
        playing with my golden retriever. Actually, he insists on playing.
      </Text>
    </BioBlock>

    <BioBlock>
      <Text>
        This site was made using Gatsby, with components and theming from
        Chakra.
      </Text>
    </BioBlock>
  </Box>
);
