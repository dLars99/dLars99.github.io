export type Job = {
  name: string;
  endDate?: Date;
  location: string;
  remote: boolean;
  startDate: Date;
  title?: string;
  bulletPoints: string[];
};

export const jobData: Job[] = [
  {
    name: "Little Caesars",
    location: "Detroit, MI",
    remote: true,
    startDate: new Date("September 15, 2022"),
    title: "Software Engineer II",
    bulletPoints: [
      "Architected new UI component patterns on admin platforms, reducing time spent on new features and maintenance by up to 75%",
      "Collaborated on React component libraries to enhance common components and fill feature gaps",
      "Directed and provided principal engineering on dependency and React framework upgrades across two platforms, cutting costs by eliminating deprecated platforms",
      "Mentored another engineer on React component reusability and Typescript best practices while fostering innovation outside their usual scope",
      "Served as the subject matter expert (SME) and first point-of-contact for two React projects",
    ],
  },
  {
    name: "FanPower (formerly Pickup)",
    endDate: new Date("September 15, 2022"),
    location: "New York, NY",
    remote: true,
    startDate: new Date("August 15, 2021"),
    title: "Software Engineer / Team Lead",
    bulletPoints: [
      "Defined Engineering scope and led development of a new admin application in ReTool, streamlining content generation with 60% fewer user interactions",
      "Developed REST API routes for Node.js and React UI components to transition from Rails to JavaScript, enabling team-wide repository contributions",
      "Implemented unit tests for public-facing UI library, ensuring comprehensive test coverage and minimizing bugs in further development",
    ],
  },
  {
    name: "SAFE Health",
    endDate: new Date("August 15, 2021"),
    location: "Detroit, MI",
    remote: true,
    startDate: new Date("November 15, 2020"),
    title: "Software Engineer",
    bulletPoints: [
      "Constructed all React UI components and a C#/.NET API backend for a natural language processing chatbot prototype",
      "Collaborated with cross-functional teams to align API routes with frontend product requirements",
    ],
  },
  {
    name: "Nashville Software School",
    endDate: new Date("November 15, 2020"),
    location: "Detroit, MI",
    remote: true,
    startDate: new Date("May 15, 2020"),
    bulletPoints: [
      `Led the extracurricular "Morning Algorithms" group which explored more advanced programming logic, helping colleagues gain knowledge of topics outside classroom scope`,
    ],
  },
  {
    name: "Earlier Experiences",
    location: "Detroit, MI",
    remote: true,
    startDate: new Date("September 15, 2012"),
    bulletPoints: [],
  },
];
