import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { ProjectLink } from "./ProjectLinks/ProjectLinks.astro";
import RrtDescription from "./ReactRoutingTabs/RrtDescription.astro";
import BarkeepDescription from "./Barkeep/BarkeepDescription.astro";
import PortfolioDescription from "./Portfolio/PortfolioDescription.astro";
import GearPatchDescription from "./GearPatch/GearPatchDescription.astro";
import GreenerDescription from "./Greener/GreenerDescription.astro";

type ProjectData = {
  title: string;
  Description: AstroComponentFactory;
  links: ProjectLink[];
};

export const projectData: ProjectData[] = [
  {
    title: "React Routing Tabs",
    Description: RrtDescription,
    links: [
      {
        name: "React Routing Tabs",
        url: "https://www.npmjs.com/package/react-routing-tabs",
        type: "npm",
      },
      {
        name: "React Routing Tabs",
        url: "https://github.com/dLars99/react-routing-tabs",
        type: "github",
      },
    ],
  },
  {
    title: "Barkeep",
    Description: BarkeepDescription,
    links: [
      {
        name: "Barkeep Backend",
        url: "https://github.com/dLars99/barkeep",
        type: "github",
      },
      {
        name: "Barkeep Frontend",
        url: "https://github.com/dLars99/barkeep-frontend",
        type: "github",
      },
    ],
  },
  {
    title: "This Website",
    Description: PortfolioDescription,
    links: [
      {
        name: "David Larsen Portfolio",
        url: "https://github.com/dLars99/barkeep",
        type: "github",
      },
    ],
  },
  {
    title: "GearPatch",
    Description: GearPatchDescription,
    links: [
      {
        name: "GearPatch - NSS Final Capstone",
        url: "https://github.com/dLars99/GearPatch",
        type: "github",
      },
    ],
  },
  {
    title: "Greener",
    Description: GreenerDescription,
    links: [
      {
        name: "Greener - NSS Frontend Capstone",
        url: "https://github.com/dLars99/greener",
        type: "github",
      },
    ],
  },
];
