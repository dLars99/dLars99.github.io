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
    imageOrientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
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
    process: z.string(),
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
    location: z.string(),
    roles: z.array(
      z.object({
        title: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
      })
    ).min(1),
    highlights: z.array(z.string()),
  }).transform((job) => {
    // Newest role first; job-level title and dates derive from roles
    const roles = [...job.roles].sort(
      (a, b) => b.startDate.valueOf() - a.startDate.valueOf()
    );
    return {
      ...job,
      roles,
      title: roles[0].title,
      startDate: roles[roles.length - 1].startDate,
      endDate: roles[0].endDate,
    };
  }),
});

export const collections = { projects, auditLog, work };
