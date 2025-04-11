export type Job = {
  name: string;
  endDate?: Date;
  location?: string;
  remote: boolean;
  startDate?: Date;
  title?: string;
  bulletPoints: string[];
};

export const jobData: Job[] = [
  {
    name: "Little Caesars",
    location: "Detroit, MI",
    remote: true,
    startDate: new Date("September 15, 2022"),
    title: "Senior Software Engineer",
    bulletPoints: [
      "Led long-term frontend development for two project teams",
      "Led development of UI interface for management of product offerings through third-party platforms, opening significant new streams of revenue",
      "Architected new UI component patterns on admin platforms, reducing time spent on new features and maintenance by up to 75%",
      "Contributed to React component libraries to enhance common components, add new components, and fill feature gaps",
      "Rebuilt key components to improve usability by incorporating UI best practices and addressing accessibility concerns",
      "Scoped front end requirements for security improvements needed to satisfy a vital partnership with an external organization",
      "Directed and provided principal engineering on dependency and React framework upgrades across both platforms, cutting costs by eliminating deprecated packages",
      "Mentored other engineers of varying skill levels on React and Typescript best practices while fostering innovation outside their usual scope",
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
      "Defined Engineering scope and supervised Agile team in building a new internal ad management platform on Node.js Express REST backend APIs and React frontend, providing more targeted engagement through the core product",
      "Defined Engineering scope and led development of a new admin application in ReTool, streamlining content generation with 60% fewer user interactions",
      "Developed REST API routes for Node.js and React UI components to transition from Rails to JavaScript, enabling team-wide repository contributions",
      "Optimized React core picker and web page, improving load times by up to 50%",
      "Wrote the JavaScript-based embed code that allows websites to embed PickUp’s cornerstone React product while syndicating content back to PickUp’s homepage, opening up previously unavailable markets for the product",
      "Upgraded error-reporting system to map better to source code and provide version-based reporting, decreasing time to resolve issues",
      "Contributed REST API routes to Node.js and React UI components to migrate tech from a Rails-based system to all JavaScript, allowing the full engineering team to contribute to any repo",
      "Implemented unit tests for public-facing UI library, ensuring comprehensive test coverage and minimizing bugs in further development",
      "Connected homepage content to Contentful, decreasing time to implement updates by up to 60%",
    ],
  },
  {
    name: "SAFE Health",
    endDate: new Date("August 15, 2021"),
    location: "Los Angeles, CA",
    remote: true,
    startDate: new Date("November 15, 2020"),
    title: "Software Engineer",
    bulletPoints: [
      "Designed and constructed front-end components in React to meet MVP for the Virtual Consult Builder (VCB) project",
      "Constructed all React UI components and a C#/.NET API backend for a natural language processing chatbot prototype with VCB integration",
      "Collaborated with cross-functional teams to align API routes with frontend product requirements",
      "Contributed React components to shared software libraries to improve code efficiency across multiple product",
    ],
  },
  {
    name: "Nashville Software School",
    endDate: new Date("November 15, 2020"),
    location: "Nashville, TN",
    remote: true,
    startDate: new Date("May 15, 2020"),
    bulletPoints: [
      `Led the extracurricular "Morning Algorithms" group which explored more advanced programming logic, helping colleagues gain knowledge of topics outside classroom scope`,
    ],
  },
  {
    name: "Earlier Experiences",
    remote: false,
    endDate: new Date("April 15, 2020"),
    bulletPoints: [
      "Provided IT support to individuals and small- to medium-size businesses",
      "Professional musician, including 5 years full-time",
      "As a support technician, created procedural checklists to improve accuracy and consistency of technician work, reducing same-issue returns by 40%",
      "As a support technician and as the company's first full-time employee, helped to establish and scale a team whose detail-oriented service kept a growing customer base happy",
      "As a musician, built a lesson studio of 50+ full-time weekly students plus additional part-time students through word-of-mouth and targeted online marketing",
      "As a musician, procured first-call positions with other musicians by learning material quickly and demonstrating flexibility with unplanned live challenges",
    ],
  },
];
