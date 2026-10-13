import { getCollection, type CollectionEntry } from "astro:content";

export type AuditEntry = CollectionEntry<"auditLog">;

export async function getSortedAuditEntries(): Promise<AuditEntry[]> {
  const entries = await getCollection("auditLog");
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
