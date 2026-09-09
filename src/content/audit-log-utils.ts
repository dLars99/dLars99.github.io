import { getCollection, type CollectionEntry } from "astro:content";

export type AuditEntry = CollectionEntry<"auditLog">;

export async function getSortedAuditEntries(): Promise<AuditEntry[]> {
  const entries = await getCollection("auditLog");
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type EmployerFacts = {
  employer: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // undefined means "Present"
};

export function getEmployerFacts(entries: AuditEntry[]): EmployerFacts[] {
  const tagged = entries
    .filter((entry) => entry.data.employer)
    .slice()
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());

  const order: string[] = [];
  const byEmployer = new Map<string, AuditEntry[]>();

  for (const entry of tagged) {
    const employer = entry.data.employer as string;
    if (!byEmployer.has(employer)) {
      byEmployer.set(employer, []);
      order.push(employer);
    }
    byEmployer.get(employer)?.push(entry);
  }

  return order.map((employer, index) => {
    const group = byEmployer.get(employer)!;
    const nextEmployer = order[index + 1];
    const nextGroup = nextEmployer ? byEmployer.get(nextEmployer) : undefined;
    return {
      employer,
      location: group.find((entry) => entry.data.location)?.data.location,
      startDate: group[0].data.date,
      endDate: nextGroup ? nextGroup[0].data.date : undefined,
    };
  });
}
