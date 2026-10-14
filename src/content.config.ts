import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: image(),
    imageAlt: z.string(),
    initialCompletionDate: z.string(),
    lastUpdatedDate: z.string(),
    links: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        type: z.enum(["github", "npm"]),
      })
    ),
    tech: z.array(z.string()),
    role: z.string(),
    challenges: z.string(),
  }),
});

const auditLog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/audit-log" }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    message: z.string(),
    employer: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    id: z.string(),
    company: z.string(),
    title: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects, auditLog, work };
