export type AssuranceAction = {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status: "Open" | "In progress" | "Awaiting evidence" | "Complete";
  priority: "Critical" | "High" | "Medium";
  source: string;
};

export const assuranceActions: AssuranceAction[] = [
  {
    id: "ACT-204",
    title: "Complete clinical review of medication omission",
    owner: "Clinical lead",
    dueDate: "2026-07-21T10:30:00.000Z",
    status: "In progress",
    priority: "Critical",
    source: "Medication exception MED-902",
  },
  {
    id: "ACT-205",
    title: "Record safeguarding referral outcome",
    owner: "Safeguarding lead",
    dueDate: "2026-07-21T12:00:00.000Z",
    status: "Awaiting evidence",
    priority: "High",
    source: "Canonical incident INC-2481",
  },
  {
    id: "ACT-206",
    title: "Review night staffing pattern",
    owner: "Service manager",
    dueDate: "2026-07-21T16:00:00.000Z",
    status: "Open",
    priority: "High",
    source: "Visit exception group VEX-31",
  },
];
