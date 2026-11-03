import { getCollection, type CollectionEntry } from "astro:content";

type RawAuditEntry = CollectionEntry<"auditLog">;

export type AuditEntry = RawAuditEntry & {
  data: RawAuditEntry["data"] & { version: string };
};

export async function getSortedAuditEntries(): Promise<AuditEntry[]> {
  const entries = await getCollection("auditLog");
  entries.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());

  // Versions are derived from each entry's bump, oldest first, starting at v0.0.0
  let [major, minor, patch] = [0, 0, 0];
  const versioned = entries.map((entry) => {
    if (entry.data.bump === "major") [major, minor, patch] = [major + 1, 0, 0];
    else if (entry.data.bump === "minor") [minor, patch] = [minor + 1, 0];
    else patch += 1;
    return {
      ...entry,
      data: { ...entry.data, version: `v${major}.${minor}.${patch}` },
    };
  });

  return versioned.reverse();
}
