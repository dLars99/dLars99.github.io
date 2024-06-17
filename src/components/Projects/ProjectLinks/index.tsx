import React, { FC } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export type ProjectLink = {
  name: string;
  url: string;
  type: LinkType;
};

type LinkType = "github" | "npm";

interface RrtLinksProps {
  links: ProjectLink[];
}

const linkDisplayNames = {
  github: "GitHub",
  npm: "NPM",
};

const linkImages = {
  github: "../../../images/github.png",
  npm: "../../../images/npm.png",
};

const ProjectLinks: FC<RrtLinksProps> = ({ links }) => {
  const getAltText = (name: string, type: LinkType) =>
    `Link to ${name} on ${linkDisplayNames[type]}`;

  return links.length > 0 ? (
    <Flex justifyContent="center" gap={12} my={4}>
      {links.map((link) => (
        <Link isExternal href={link.url} key={link.name}>
          <StaticImage
            alt={getAltText(link.name, link.type)}
            src={linkImages[link.type]}
            placeholder="blurred"
            width={40}
            height={40}
          />
        </Link>
      ))}
    </Flex>
  ) : null;
};

export default ProjectLinks;
