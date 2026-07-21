import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgSchema,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const appSchema = pgSchema("app");
export const marts = pgSchema("marts");

const lineage = {
  sourceRunId: uuid("source_run_id").notNull(),
  sourceUpdatedAt: timestamp("source_updated_at", { withTimezone: true }),
  loadedAt: timestamp("loaded_at", { withTimezone: true }).notNull(),
  sourceWatermark: text("watermark").notNull(),
  definitionVersion: text("definition_version").notNull().default("1.0.0"),
};

export const actions = appSchema.table("actions", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  owner: text("owner").notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  status: text("status").notNull(),
  priority: text("priority").notNull(),
  evidenceUrl: text("evidence_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exceptions = appSchema.table("exceptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  domain: text("domain").notNull(),
  recordId: text("record_id").notNull(),
  severity: text("severity").notNull(),
  summary: text("summary").notNull(),
  acknowledged: boolean("acknowledged").notNull().default(false),
  actionId: uuid("action_id").references(() => actions.id),
});

export const safeguardingFlags = appSchema.table("safeguarding_flags", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: text("client_id").notNull(),
  incidentId: text("incident_id").notNull(),
  status: text("status").notNull(),
  rationale: text("rationale").notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

export const auditEvents = appSchema.table("audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  actorId: text("actor_id").notNull(),
  eventType: text("event_type").notNull(),
  scope: jsonb("scope").notNull(),
  targetId: text("target_id"),
  correlationId: uuid("correlation_id").notNull(),
});

export const evidenceRecords = appSchema.table("evidence_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  scope: jsonb("scope").notNull(),
  category: text("category").notNull(),
  ownerId: text("owner_id").notNull(),
  source: text("source").notNull(),
  blobPath: text("blob_path"),
  reviewAt: timestamp("review_at", { withTimezone: true }),
  supersedesId: uuid("supersedes_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const legalAuthorisations = appSchema.table("legal_authorisations", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: text("client_id").notNull(),
  serviceSetting: text("service_setting").notNull(),
  route: text("route").notNull(),
  capacityDecisionId: text("capacity_decision_id").notNull(),
  bestInterestDecisionId: text("best_interest_decision_id").notNull(),
  restrictions: jsonb("restrictions").notNull(),
  status: text("status").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  documentBlobPath: text("document_blob_path"),
});

export const competencyRequirements = appSchema.table("competency_requirements", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: text("client_id").notNull(),
  competency: text("competency").notNull(),
  effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull(),
  effectiveTo: timestamp("effective_to", { withTimezone: true }),
  approvedBy: text("approved_by").notNull(),
});

export const metricDefinitions = appSchema.table("metric_definitions", {
  id: text("id").notNull(),
  definitionVersion: text("definition_version").notNull(),
  contract: jsonb("contract").notNull(),
  approvedBy: text("approved_by").notNull(),
  effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull(),
});

export const assuranceSnapshots = appSchema.table("assurance_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  scope: jsonb("scope").notNull(),
  period: jsonb("period").notNull(),
  sourceWatermarks: jsonb("source_watermarks").notNull(),
  metricVersions: jsonb("metric_versions").notNull(),
  signedBy: text("signed_by"),
  signedAt: timestamp("signed_at", { withTimezone: true }),
  version: integer("version").notNull(),
});

export const feedbackRecords = appSchema.table("feedback_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: text("kind").notNull(),
  scope: jsonb("scope").notNull(),
  theme: text("theme").notNull(),
  consentState: text("consent_state").notNull(),
  acknowledgedAt: timestamp("acknowledged_at", { withTimezone: true }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  outcome: text("outcome"),
});

export const aiRuns = appSchema.table("ai_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: text("actor_id").notNull(),
  scope: jsonb("scope").notNull(),
  promptVersion: text("prompt_version").notNull(),
  model: text("model").notNull(),
  toolCalls: jsonb("tool_calls").notNull(),
  citationIds: jsonb("citation_ids").notNull(),
  tokenUsage: integer("token_usage").notNull(),
  approvalState: text("approval_state").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const integrationRuns = appSchema.table("integration_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  domain: text("domain").notNull(),
  watermark: text("watermark").notNull(),
  state: text("state").notNull(),
  failedStep: text("failed_step"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const dimOrganisation = marts.table("dim_organisation", {
  organisationId: text("organisation_id").primaryKey(),
  name: text("name").notNull(),
  ...lineage,
});

export const dimLocation = marts.table("dim_location", {
  locationId: text("location_id").primaryKey(),
  organisationId: text("organisation_id").notNull(),
  name: text("name").notNull(),
  ...lineage,
});

export const dimPayer = marts.table("dim_payer", {
  payerId: text("payer_id").primaryKey(),
  name: text("name").notNull(),
  payerType: text("payer_type").notNull(),
  ...lineage,
});

export const dimCalendar = marts.table("dim_calendar", {
  calendarDate: timestamp("calendar_date", { withTimezone: true }).primaryKey(),
  financialPeriod: text("financial_period").notNull(),
  ...lineage,
});

export const dimClient = marts.table("dim_client", {
  clientId: text("client_id").primaryKey(),
  displayCode: text("display_code").notNull(),
  serviceId: text("service_id").notNull(),
  active: boolean("active").notNull(),
  ...lineage,
});

export const dimStaff = marts.table("dim_staff", {
  staffId: text("staff_id").primaryKey(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull(),
  active: boolean("active").notNull(),
  ...lineage,
});

export const dimService = marts.table("dim_service", {
  serviceId: text("service_id").primaryKey(),
  name: text("name").notNull(),
  setting: text("setting").notNull(),
  ...lineage,
});

export const factVisit = marts.table("fact_visit", {
  visitId: text("visit_id").primaryKey(),
  clientId: text("client_id").notNull(),
  serviceId: text("service_id").notNull(),
  scheduledStart: timestamp("scheduled_start", { withTimezone: true }).notNull(),
  actualStart: timestamp("actual_start", { withTimezone: true }),
  outcome: text("outcome").notNull(),
  ...lineage,
});

export const factIncident = marts.table("fact_incident", {
  incidentId: text("incident_id").primaryKey(),
  clientId: text("client_id").notNull(),
  serviceId: text("service_id").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  reportedAt: timestamp("reported_at", { withTimezone: true }).notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  ...lineage,
});

export const factMedicationTask = marts.table("fact_medication_task", {
  taskId: text("task_id").primaryKey(),
  clientId: text("client_id").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  outcome: text("outcome").notNull(),
  riskLevel: text("risk_level"),
  ...lineage,
});

export const factObservation = marts.table("fact_observation", {
  observationId: text("observation_id").primaryKey(),
  clientId: text("client_id").notNull(),
  observedAt: timestamp("observed_at", { withTimezone: true }).notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  ...lineage,
});

export const factTrainingRecord = marts.table("fact_training_record", {
  recordId: text("record_id").primaryKey(),
  staffId: text("staff_id").notNull(),
  competency: text("competency").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  status: text("status").notNull(),
  ...lineage,
});

export const martClientDaily = marts.table("mart_client_daily", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  clientId: text("client_id").notNull(),
  deliveredVisits: integer("delivered_visits").notNull(),
  openExceptions: integer("open_exceptions").notNull(),
  ...lineage,
});

export const martIncidentAssurance = marts.table("mart_incident_assurance", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  serviceId: text("service_id").notNull(),
  incidentCount: integer("incident_count").notNull(),
  unresolvedCount: integer("unresolved_count").notNull(),
  ...lineage,
});

export const martTrainingCompliance = marts.table("mart_training_compliance", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  serviceId: text("service_id").notNull(),
  compliantRecords: integer("compliant_records").notNull(),
  requiredRecords: integer("required_records").notNull(),
  ...lineage,
});

export const martActionStatus = marts.table("mart_action_status", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  serviceId: text("service_id").notNull(),
  openActions: integer("open_actions").notNull(),
  overdueActions: integer("overdue_actions").notNull(),
  ...lineage,
});

export const martVisitExceptions = marts.table("mart_visit_exceptions", {
  visitId: text("visit_id").primaryKey(),
  serviceId: text("service_id").notNull(),
  exceptionType: text("exception_type").notNull(),
  minutesVariance: integer("minutes_variance"),
  ...lineage,
});

export const martMedicationExceptions = marts.table("mart_medication_exceptions", {
  taskId: text("task_id").primaryKey(),
  clientId: text("client_id").notNull(),
  exceptionType: text("exception_type").notNull(),
  requiresReview: boolean("requires_review").notNull(),
  ...lineage,
});

export const martQualityStatementEvidence = marts.table("mart_quality_statement_evidence", {
  qualityStatementId: text("quality_statement_id").notNull(),
  serviceId: text("service_id").notNull(),
  evidenceCount: integer("evidence_count").notNull(),
  coverage: numeric("coverage", { precision: 5, scale: 2 }),
  assuranceStatus: text("assurance_status").notNull(),
  ...lineage,
});

export const factCareTask = marts.table("fact_care_task", {
  taskId: text("task_id").primaryKey(),
  visitId: text("visit_id").notNull(),
  clientId: text("client_id").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  outcome: text("outcome"),
  ...lineage,
});

export const factRestrictiveIntervention = marts.table("fact_restrictive_intervention", {
  interventionId: text("intervention_id").primaryKey(),
  observationId: text("observation_id").notNull(),
  clientId: text("client_id").notNull(),
  classification: text("classification").notNull(),
  durationMinutes: integer("duration_minutes"),
  debriefState: text("debrief_state").notNull(),
  ...lineage,
});

export const factAbsence = marts.table("fact_absence", {
  absenceId: text("absence_id").primaryKey(),
  staffId: text("staff_id").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  status: text("status").notNull(),
  ...lineage,
});

export const factShift = marts.table("fact_shift", {
  shiftId: text("shift_id").primaryKey(),
  staffId: text("staff_id").notNull(),
  serviceId: text("service_id").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  status: text("status").notNull(),
  ...lineage,
});

export const factInvoice = marts.table("fact_invoice", {
  invoiceId: text("invoice_id").primaryKey(),
  payerId: text("payer_id").notNull(),
  clientId: text("client_id"),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
  status: text("status").notNull(),
  ...lineage,
});

export const factExpense = marts.table("fact_expense", {
  expenseId: text("expense_id").primaryKey(),
  serviceId: text("service_id"),
  clientId: text("client_id"),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  matchConfidence: numeric("match_confidence", { precision: 5, scale: 2 }),
  approvalState: text("approval_state").notNull(),
  ...lineage,
});

export const martServiceDaily = marts.table("mart_service_daily", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  serviceId: text("service_id").notNull(),
  openExceptions: integer("open_exceptions").notNull(),
  evidenceCoverage: numeric("evidence_coverage", { precision: 5, scale: 2 }),
  ...lineage,
});

export const martStaffReadiness = marts.table("mart_staff_readiness", {
  snapshotDate: timestamp("snapshot_date", { withTimezone: true }).notNull(),
  staffId: text("staff_id").notNull(),
  serviceId: text("service_id").notNull(),
  readinessState: text("readiness_state").notNull(),
  ...lineage,
});

export const martPackageFinance = marts.table("mart_package_finance", {
  accountingPeriod: text("accounting_period").notNull(),
  clientId: text("client_id").notNull(),
  revenue: numeric("revenue", { precision: 14, scale: 2 }),
  staffingCost: numeric("staffing_cost", { precision: 14, scale: 2 }),
  expenseCost: numeric("expense_cost", { precision: 14, scale: 2 }),
  allocationVersion: text("allocation_version").notNull(),
  ...lineage,
});
