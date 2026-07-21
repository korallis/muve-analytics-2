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
  coverage: numeric("coverage", { precision: 5, scale: 2 }).notNull(),
  assuranceStatus: text("assurance_status").notNull(),
  ...lineage,
});
