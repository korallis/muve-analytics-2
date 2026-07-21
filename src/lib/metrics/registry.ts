export type QualityQuestion = "Safe" | "Effective" | "Caring" | "Responsive" | "Well-led";
export type AssuranceStatus = "Strong" | "Adequate" | "Weak" | "Unknown";

type Threshold = {
  operator: "lt" | "gt";
  value: number;
  severity: "warning" | "critical";
};

export type MetricDefinition = {
  id: string;
  name: string;
  description: string;
  numerator: string;
  denominator: string;
  unit: "count" | "percent" | "minutes" | "currency";
  caveat: string | null;
  qualityStatement: string;
  qualityQuestion: QualityQuestion;
  definitionVersion: string;
  sourceMart: string;
  threshold: Threshold | null;
};

export const metricRegistry = {
  visit_delivery: {
    id: "visit_delivery",
    name: "Visit delivery",
    description: "Scheduled visits with a verified completed outcome.",
    numerator: "Completed scheduled visits",
    denominator: "All scheduled visits expected in the selected period",
    unit: "percent",
    caveat: "Source records without an outcome are unknown, never compliant.",
    qualityStatement: "Safe systems, pathways and transitions",
    qualityQuestion: "Safe",
    definitionVersion: "1.1.0",
    sourceMart: "mart_visit_exceptions",
    threshold: { operator: "lt", value: 98, severity: "critical" },
  },
  medication_documentation: {
    id: "medication_documentation",
    name: "Medication documentation",
    description: "Medication tasks with a structured recorded outcome.",
    numerator: "Medication tasks with a completed structured outcome",
    denominator: "Medication tasks due in the selected period",
    unit: "percent",
    caveat: "Missing source tasks are reported as unknown coverage.",
    qualityStatement: "Medicines optimisation",
    qualityQuestion: "Safe",
    definitionVersion: "1.0.0",
    sourceMart: "mart_medication_exceptions",
    threshold: { operator: "lt", value: 99, severity: "critical" },
  },
  training_compliance: {
    id: "training_compliance",
    name: "Mandatory training compliance",
    description: "Current mandatory records against required records.",
    numerator: "Current mandatory training records",
    denominator: "Mandatory training records required for active staff",
    unit: "percent",
    caveat: "Missing role requirements make coverage unknown rather than 100%.",
    qualityStatement: "Safe and effective staffing",
    qualityQuestion: "Effective",
    definitionVersion: "1.2.0",
    sourceMart: "mart_training_compliance",
    threshold: { operator: "lt", value: 95, severity: "warning" },
  },
  rpi_indicator: {
    id: "rpi_indicator",
    name: "Restrictive-practice indicator",
    description: "Observations containing approved restrictive-practice terms for human review.",
    numerator: "Keyword-derived candidate observations",
    denominator: "All observations in the selected period",
    unit: "count",
    caveat: "Estimated indicator only: keyword-derived candidates are not audited RPI counts.",
    qualityStatement: "Involving people to manage risks",
    qualityQuestion: "Safe",
    definitionVersion: "1.0.0",
    sourceMart: "fact_observation",
    threshold: null,
  },
  overdue_actions: {
    id: "overdue_actions",
    name: "Overdue assurance actions",
    description: "Open actions whose approved due date has passed.",
    numerator: "Open actions past due date",
    denominator: "All open assurance actions",
    unit: "count",
    caveat: null,
    qualityStatement: "Governance, management and sustainability",
    qualityQuestion: "Well-led",
    definitionVersion: "1.0.0",
    sourceMart: "mart_action_status",
    threshold: { operator: "gt", value: 0, severity: "warning" },
  },
} satisfies Record<string, MetricDefinition>;

export type MetricId = keyof typeof metricRegistry;

export const demoMetricValues: Record<MetricId, number> = {
  visit_delivery: 98.4,
  medication_documentation: 99.1,
  training_compliance: 94,
  rpi_indicator: 3,
  overdue_actions: 2,
};

export function getMetric(id: string) {
  if (!(id in metricRegistry)) return null;
  const metricId = id as MetricId;
  return { definition: metricRegistry[metricId], value: demoMetricValues[metricId] };
}

export function breachesThreshold(id: MetricId, value = demoMetricValues[id]) {
  const threshold = metricRegistry[id].threshold;
  if (!threshold) return false;
  return threshold.operator === "lt" ? value < threshold.value : value > threshold.value;
}
