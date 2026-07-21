import type { AssuranceStatus, QualityQuestion } from "@/lib/metrics/registry";

export type EvidenceCategory = "People’s experience" | "Staff and leader feedback" | "Partner feedback" | "Observation" | "Processes" | "Outcomes";
export type QualityStatement = { id: string; question: QualityQuestion; name: string; status: AssuranceStatus; evidenceCoverage: number | null; openActions: number };

function statements(question: QualityQuestion, names: string[]): QualityStatement[] {
  return names.map((name, index) => ({
    id: `${question.toLowerCase().replace("-", "")}-${index + 1}`,
    question,
    name,
    status: index === names.length - 1 ? "Unknown" : index === names.length - 2 ? "Weak" : index % 3 === 0 ? "Strong" : "Adequate",
    evidenceCoverage: index === names.length - 1 ? null : 64 + ((index * 7) % 31),
    openActions: index % 4,
  }));
}

export const qualityStatements = [
  ...statements("Safe", ["Learning culture", "Safe systems, pathways and transitions", "Safeguarding", "Involving people to manage risks", "Safe environments", "Safe and effective staffing", "Infection prevention and control", "Medicines optimisation"]),
  ...statements("Effective", ["Assessing needs", "Delivering evidence-based care and treatment", "How staff, teams and services work together", "Supporting people to live healthier lives", "Monitoring and improving outcomes", "Consent to care and treatment"]),
  ...statements("Caring", ["Kindness, compassion and dignity", "Treating people as individuals", "Independence, choice and control", "Responding to people’s immediate needs", "Workforce wellbeing and enablement"]),
  ...statements("Responsive", ["Person-centred care", "Care provision, integration and continuity", "Providing information", "Listening to and involving people", "Equity in access", "Equity in experiences and outcomes", "Planning for the future"]),
  ...statements("Well-led", ["Shared direction and culture", "Capable, compassionate and inclusive leaders", "Freedom to speak up", "Workforce equality, diversity and inclusion", "Governance, management and sustainability", "Partnerships and communities", "Learning, improvement and innovation", "Environmental sustainability"]),
];

export const evidenceRecords = [
  { id: "EV-991", title: "Safeguarding outcome review", category: "Processes" as EvidenceCategory, owner: "Quality Lead", scope: "Oak View", source: "Approved meeting record", reviewDate: "28 Jul 2026", statements: ["Safeguarding"], status: "Current" },
  { id: "EV-992", title: "People’s experience interviews", category: "People’s experience" as EvidenceCategory, owner: "Registered Manager", scope: "Rose House", source: "Consent-recorded interviews", reviewDate: "24 Jul 2026", statements: ["Listening to and involving people"], status: "Due soon" },
  { id: "EV-993", title: "Partner feedback survey", category: "Partner feedback" as EvidenceCategory, owner: "Nominated Individual", scope: "Organisation", source: "Partner survey", reviewDate: "18 Jul 2026", statements: ["Partnerships and communities"], status: "Expired" },
];

export const governanceWorkflows = {
  snapshot: { id: "SNAP-2026-06-v2", scope: "All services", period: "June 2026", watermark: "birdie-2026-07-01T05:28Z", metricVersions: "6 approved versions", signedBy: "Registered Manager", formats: ["PDF", "DOCX", "XLSX"] },
  notification: { id: "NOT-104", type: "Duty of Candour review", applicable: "Confirmed by Registered Manager", deadline: "22 Jul 2026 12:00", owner: "Quality Lead", state: "Draft — not submitted by AI" },
  feedback: { id: "FB-332", kind: "Complaint", theme: "Visit continuity", acknowledged: "Within 2-day SLA", outcome: "Review in progress", statement: "Care provision, integration and continuity" },
};
