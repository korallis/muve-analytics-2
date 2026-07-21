from dataclasses import dataclass


@dataclass(frozen=True)
class SourceSpec:
    table: str
    primary_key: str
    watermark_column: str
    approved_fields: tuple[str, ...]


SOURCE_CATALOGUE = (
    SourceSpec("clients", "id", "updated_at", ("id", "service_id", "status", "updated_at")),
    SourceSpec("caregivers", "id", "updated_at", ("id", "display_name", "role", "status", "updated_at")),
    SourceSpec("services", "id", "updated_at", ("id", "name", "setting", "updated_at")),
    SourceSpec("visits", "id", "updated_at", ("id", "client_id", "service_id", "scheduled_start", "actual_start", "outcome", "updated_at")),
    SourceSpec("incidents", "id", "updated_at", ("id", "client_id", "service_id", "occurred_at", "reported_at", "category", "status", "updated_at")),
    SourceSpec("medication_tasks", "id", "updated_at", ("id", "client_id", "scheduled_at", "outcome", "risk_level", "updated_at")),
    SourceSpec("observations", "id", "updated_at", ("id", "client_id", "observed_at", "category", "summary", "updated_at")),
    SourceSpec("training_records", "id", "updated_at", ("id", "caregiver_id", "competency", "expires_at", "status", "updated_at")),
)

MART_CATALOGUE = (
    "dim_client",
    "dim_staff",
    "dim_service",
    "fact_visit",
    "fact_incident",
    "fact_medication_task",
    "fact_observation",
    "fact_training_record",
    "mart_client_daily",
    "mart_incident_assurance",
    "mart_training_compliance",
    "mart_action_status",
    "mart_visit_exceptions",
    "mart_medication_exceptions",
    "mart_quality_statement_evidence",
)
