export type ExceptionStatus = "New" | "Acknowledged" | "Resolved" | "Reopened";
export type ExceptionDomain = "Visit" | "Medication" | "Incident" | "Staffing" | "Review";

export type AssuranceException = {
  id: string;
  domain: ExceptionDomain;
  title: string;
  service: string;
  severity: "Critical" | "High" | "Medium";
  status: ExceptionStatus;
  age: string;
  underlyingRecords: string[];
  actionId: string | null;
};

export const assuranceExceptions: AssuranceException[] = [
  { id: "EX-101", domain: "Medication", title: "Omitted medication requires review", service: "Rose House", severity: "Critical", status: "Acknowledged", age: "1h 30m", underlyingRecords: ["MED-902"], actionId: "ACT-204" },
  { id: "EX-102", domain: "Visit", title: "Repeated late night visits", service: "North Supported Living", severity: "High", status: "New", age: "9h", underlyingRecords: ["VIS-901", "VIS-909"], actionId: "ACT-206" },
  { id: "EX-103", domain: "Incident", title: "Safeguarding outcome not recorded", service: "Oak View", severity: "High", status: "Reopened", age: "18h", underlyingRecords: ["INC-2481", "REF-2481"], actionId: "ACT-205" },
  { id: "EX-104", domain: "Staffing", title: "Competency coverage gap", service: "North Supported Living", severity: "High", status: "New", age: "2d", underlyingRecords: ["SHIFT-73", "COMP-12"], actionId: null },
  { id: "EX-105", domain: "Review", title: "Risk plan review overdue", service: "Rose House", severity: "Medium", status: "Resolved", age: "4d", underlyingRecords: ["PLAN-44"], actionId: "ACT-201" },
];
