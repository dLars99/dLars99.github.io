import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { execSync } from "node:child_process";

function getLastCommitDate() {
  try {
    return execSync("git log -1 --format=%cs").toString().trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: image(),
    imageAlt: z.string(),
    initialCompletionDate: z.string(),
    lastUpdatedDate: z.string().optional(),
    links: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        type: z.enum(["github", "npm"]),
        showNameOnLink: z.boolean().optional(),
      })
    ),
    tech: z.array(z.string()),
    role: z.string(),
    challenges: z.string(),
  }).transform((project, ctx) => {
    // This site's own entry tracks the deployed commit
    const lastUpdatedDate =
      project.id === "portfolio" ? getLastCommitDate() : project.lastUpdatedDate;
    if (!lastUpdatedDate) {
      ctx.addIssue({ code: "custom", message: "lastUpdatedDate is required" });
      return z.NEVER;
    }
    return { ...project, lastUpdatedDate };
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
