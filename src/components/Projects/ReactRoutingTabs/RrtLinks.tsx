import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

const RrtLinks = () => (
  <Flex justifyContent="center" gap={12} my={4}>
    <Link isExternal href="https://www.npmjs.com/package/react-routing-tabs">
      <StaticImage
        alt="Link to React Routing Tabs download on NPM"
        src="../../../images/npm.png"
        placeholder="blurred"
        width={40}
        height={40}
      />
    </Link>
    <Link isExternal href="https://github.com/dLars99/react-routing-tabs">
      <StaticImage
        alt="Link to React Routing Tabs on Github"
        src="../../../images/github.png"
        placeholder="blurred"
        width={40}
        height={40}
      />
    </Link>
  </Flex>
);

export default RrtLinks;
