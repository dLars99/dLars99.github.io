import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
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
    location: z.string().optional(),
  }),
});

export const collections = { projects, auditLog };
