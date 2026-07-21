export type QualityQuestion = "Safe" | "Effective" | "Caring" | "Responsive" | "Well-led";
export type AssuranceStatus = "Strong" | "Adequate" | "Weak" | "Unknown" | "Inapplicable";

type Threshold = {
  operator: "lt" | "gt";
  value: number;
  severity: "warning" | "critical";
};

export type MetricDefinition = {
  id: string;
  name: string;
  description: string;
  businessQuestion: string;
  owner: string;
  approvalState: "approved";
  approvedBy: string;
  grain: string;
  timeBasis: string;
  numerator: string;
  denominator: string;
  population: string;
  exclusions: string;
  nullCoverageRule: string;
  unit: "count" | "percent" | "minutes" | "currency" | "hours";
  caveat: string | null;
  qualityStatement: string;
  qualityQuestion: QualityQuestion;
  definitionVersion: string;
  effectiveFrom: string;
  sourceMart: string;
  refreshCadence: string;
  freshnessSla: string;
  threshold: Threshold | null;
};

const common = {
  approvalState: "approved" as const,
  approvedBy: "Muve Metric Governance Group",
  effectiveFrom: "2026-07-01",
  refreshCadence: "Hourly incremental; nightly reconciliation",
  freshnessSla: "Source watermark plus 10 minutes",
};

export const metricRegistry = {
  visit_delivery: {
    ...common,
    id: "visit_delivery", name: "Visit delivery", description: "Scheduled visits with a verified completed outcome.",
    businessQuestion: "Were expected visits safely delivered?", owner: "Operations Director", grain: "One scheduled visit", timeBasis: "Scheduled start",
    numerator: "Completed scheduled visits", denominator: "All scheduled visits expected in the selected period", population: "Active service visits", exclusions: "Approved cancellations",
    nullCoverageRule: "Missing outcomes remain Unknown and are excluded from compliant visits.", unit: "percent", caveat: "Source records without an outcome are unknown, never compliant.",
    qualityStatement: "Safe systems, pathways and transitions", qualityQuestion: "Safe", definitionVersion: "1.1.0", sourceMart: "mart_visit_exceptions",
    threshold: { operator: "lt", value: 98, severity: "critical" },
  },
  medication_documentation: {
    ...common,
    id: "medication_documentation", name: "Medication documentation", description: "Medication tasks with a structured recorded outcome.",
    businessQuestion: "Are medication outcomes completely documented?", owner: "Quality Lead", grain: "One due medication task", timeBasis: "Scheduled time",
    numerator: "Medication tasks with a completed structured outcome", denominator: "Medication tasks due in the selected period", population: "All due medication tasks", exclusions: "Voided tasks with approved reason",
    nullCoverageRule: "Missing source tasks are Unknown rather than compliant.", unit: "percent", caveat: "Missing source tasks are reported as unknown coverage.",
    qualityStatement: "Medicines optimisation", qualityQuestion: "Safe", definitionVersion: "1.0.0", sourceMart: "mart_medication_exceptions",
    threshold: { operator: "lt", value: 99, severity: "critical" },
  },
  training_compliance: {
    ...common,
    id: "training_compliance", name: "Mandatory training compliance", description: "Current mandatory records against required records.",
    businessQuestion: "Do active staff hold current required training?", owner: "Workforce Lead", grain: "One staff-requirement pair", timeBasis: "Snapshot date",
    numerator: "Current mandatory training records", denominator: "Mandatory training records required for active staff", population: "Active staff and approved role requirements", exclusions: "Approved long-term leave",
    nullCoverageRule: "Missing role requirements make coverage Unknown.", unit: "percent", caveat: "Missing role requirements make coverage unknown rather than 100%.",
    qualityStatement: "Safe and effective staffing", qualityQuestion: "Effective", definitionVersion: "1.2.0", sourceMart: "mart_training_compliance",
    threshold: { operator: "lt", value: 95, severity: "warning" },
  },
  rpi_indicator: {
    ...common,
    id: "rpi_indicator", name: "Restrictive-practice indicator", description: "Observations containing approved restrictive-practice terms for human review.",
    businessQuestion: "Which observations may describe restrictive practice?", owner: "PBS Lead", grain: "One observation", timeBasis: "Observed time",
    numerator: "Keyword-derived candidate observations", denominator: "All observations in the selected period", population: "Approved observation categories", exclusions: "Retracted observations",
    nullCoverageRule: "Unavailable narrative coverage is Unknown.", unit: "count", caveat: "Estimated indicator only: keyword-derived candidates are not audited RPI counts.",
    qualityStatement: "Involving people to manage risks", qualityQuestion: "Safe", definitionVersion: "1.0.0", sourceMart: "fact_observation", threshold: null,
  },
  overdue_actions: {
    ...common,
    id: "overdue_actions", name: "Overdue assurance actions", description: "Open actions whose approved due date has passed.",
    businessQuestion: "Which assurance actions are overdue?", owner: "Quality Lead", grain: "One assurance action", timeBasis: "Approved due date",
    numerator: "Open actions past due date", denominator: "All open assurance actions", population: "Open controlled actions", exclusions: "Approved paused actions",
    nullCoverageRule: "Actions without an approved due date are Unknown and separately flagged.", unit: "count", caveat: null,
    qualityStatement: "Governance, management and sustainability", qualityQuestion: "Well-led", definitionVersion: "1.0.0", sourceMart: "mart_action_status",
    threshold: { operator: "gt", value: 0, severity: "warning" },
  },
  package_margin: {
    ...common,
    id: "package_margin", name: "Package margin", description: "Revenue less allocated staffing and expense cost by package.",
    businessQuestion: "Which support packages are financially sustainable?", owner: "Finance Director", grain: "One client package per accounting period", timeBasis: "Accounting period",
    numerator: "Revenue minus approved allocated cost", denominator: "Recognised package revenue", population: "Active funded packages", exclusions: "Unallocated costs remain visible outside the ratio",
    nullCoverageRule: "Unmatched billing or cost records make the package Unknown.", unit: "percent", caveat: "Allocation rule version 1.0; unallocated costs shown separately.",
    qualityStatement: "Governance, management and sustainability", qualityQuestion: "Well-led", definitionVersion: "1.0.0", sourceMart: "mart_package_finance",
    threshold: { operator: "lt", value: 12, severity: "warning" },
  },
} satisfies Record<string, MetricDefinition>;

export type MetricId = keyof typeof metricRegistry;

export const semanticSnapshot: Record<MetricId, number | null> = {
  visit_delivery: 98.4,
  medication_documentation: 99.1,
  training_compliance: 94,
  rpi_indicator: 3,
  overdue_actions: 2,
  package_margin: 18.7,
};

export function getMetric(id: string) {
  if (!(id in metricRegistry)) return null;
  const metricId = id as MetricId;
  return { definition: metricRegistry[metricId], value: semanticSnapshot[metricId] };
}

export function renderMetricValue(id: MetricId) {
  const value = semanticSnapshot[id];
  if (value === null) return "Unknown";
  const definition: MetricDefinition = metricRegistry[id];
  const unit = definition.unit;
  if (unit === "percent") return `${value}%`;
  if (unit === "currency") return `£${value.toLocaleString("en-GB")}`;
  return value.toLocaleString("en-GB");
}

export function breachesThreshold(id: MetricId, value = semanticSnapshot[id]) {
  const threshold = metricRegistry[id].threshold;
  if (!threshold || value === null) return false;
  return threshold.operator === "lt" ? value < threshold.value : value > threshold.value;
}
