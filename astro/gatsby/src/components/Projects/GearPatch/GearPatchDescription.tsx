import React from "react";
import { Box, Text } from "@chakra-ui/react";

const GearPatchDescription = () => (
  <Box pr={[12, 16]}>
    <Text>Initial completion: November 2020</Text>

    <Text>A peer-to-peer network for renting musical equipment</Text>

    <Box>
      <Text>
        GearPatch is a platform for musicians to make some money on their extra
        equipment by renting it to other musicians. A user can request a rental,
        which is then confirmed by the owner.
      </Text>

      <Text>
        This was my fullstack capstone for Nashville Software School, right as I
        was starting my software career. The full project was built in roughly
        ten days.
      </Text>
    </Box>

    <Text>SQL, C#/.NET API, React client</Text>
  </Box>
);

export default GearPatchDescription;
