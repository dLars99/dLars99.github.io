import React from "react";
import { Box, Text } from "@chakra-ui/react";

const GreenerDescription = () => (
  <Box pr={[12, 16]}>
    <Text>Initial completion: May 2024</Text>

    <Text>An open-source tab library of my creation</Text>

    <Box>
      <Text>
        Creating tabs for your router is easy. Making them meet WAI-ARIA
        accessibility standards is not.
      </Text>

      <Text>
        Lots of tab libraries give you accessible tabs. Connecting them to your
        router, though, means jumping through lots of hoops.
      </Text>

      <Text>
        React Routing Tabs gives you accessible tabs that connect to your router
        with minimal effort.
      </Text>
    </Box>
  </Box>
);

export default GreenerDescription;
