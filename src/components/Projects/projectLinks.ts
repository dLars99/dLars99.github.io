import { type ProjectLink } from "./ProjectLinks/ProjectLinks.astro";

export const projectLinks: Record<string, ProjectLink[]> = {
  barkeep: [
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
  portfolio: [
    {
      name: "David Larsen Portfolio",
      url: "https://github.com/dLars99/barkeep",
      type: "github",
    },
  ],
};
