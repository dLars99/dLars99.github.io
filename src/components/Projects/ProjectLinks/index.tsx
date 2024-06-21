import React, { FC } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

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

const ProjectLinks: FC<RrtLinksProps> = ({ links }) => {
  const imageData = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const parseImage = (type: LinkType) => {
    const edgeWithImageNode = imageData.allFile.edges.find((edge: any) =>
      edge.node.childImageSharp.gatsbyImageData.images.fallback.src.includes(
        type
      )
    );
    return getImage(edgeWithImageNode.node);
  };

  const getAltText = (name: string, type: LinkType) =>
    `Link to ${name} on ${linkDisplayNames[type]}`;

  return links.length > 0 ? (
    <Flex justifyContent="center" gap={12} my={4}>
      {links.map((link) => {
        const image = parseImage(link.type);
        return image ? (
          <Link isExternal href={link.url} key={link.name}>
            <GatsbyImage alt={getAltText(link.name, link.type)} image={image} />
          </Link>
        ) : null;
      })}
    </Flex>
  ) : null;
};

export default ProjectLinks;
