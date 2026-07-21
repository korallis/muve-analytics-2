from dataclasses import dataclass


@dataclass(frozen=True)
class SourceSpec:
    table: str
    primary_key: str
    watermark_column: str
    approved_fields: tuple[str, ...]


@dataclass(frozen=True)
class MartSpec:
    name: str
    grain: str
    sources: tuple[str, ...]


SOURCE_CATALOGUE = (
    SourceSpec("clients", "id", "updated_at", ("id", "service_id", "status", "updated_at")),
    SourceSpec("caregivers", "id", "updated_at", ("id", "display_name", "role", "status", "updated_at")),
    SourceSpec("services", "id", "updated_at", ("id", "name", "setting", "updated_at")),
    SourceSpec("visits", "id", "updated_at", ("id", "client_id", "service_id", "scheduled_start", "actual_start", "outcome", "updated_at")),
    SourceSpec("care_tasks", "id", "updated_at", ("id", "visit_id", "client_id", "scheduled_at", "outcome", "updated_at")),
    SourceSpec("incidents", "id", "updated_at", ("id", "client_id", "service_id", "occurred_at", "reported_at", "category", "status", "updated_at")),
    SourceSpec("medication_tasks", "id", "updated_at", ("id", "client_id", "scheduled_at", "outcome", "risk_level", "updated_at")),
    SourceSpec("observations", "id", "updated_at", ("id", "client_id", "observed_at", "category", "summary", "updated_at")),
    SourceSpec("training_records", "id", "updated_at", ("id", "caregiver_id", "competency", "expires_at", "status", "updated_at")),
    SourceSpec("absences", "id", "updated_at", ("id", "caregiver_id", "starts_at", "ends_at", "status", "updated_at")),
    SourceSpec("shifts", "id", "updated_at", ("id", "caregiver_id", "service_id", "starts_at", "ends_at", "status", "updated_at")),
)

MART_SPECS = (
    MartSpec("dim_organisation", "one organisation", ("app.organisations",)),
    MartSpec("dim_location", "one regulated location", ("services", "app.locations")),
    MartSpec("dim_service", "one service", ("services",)),
    MartSpec("dim_client", "one active person code", ("clients",)),
    MartSpec("dim_staff", "one active caregiver", ("caregivers",)),
    MartSpec("dim_payer", "one approved payer", ("xero.contacts",)),
    MartSpec("dim_calendar", "one calendar date", ("generated calendar",)),
    MartSpec("fact_visit", "one scheduled visit", ("visits",)),
    MartSpec("fact_care_task", "one due care task", ("care_tasks",)),
    MartSpec("fact_medication_task", "one due medication task", ("medication_tasks",)),
    MartSpec("fact_incident", "one alert-anchored incident", ("incidents",)),
    MartSpec("fact_restrictive_intervention", "one reviewed intervention", ("observations", "app.rpi_reviews")),
    MartSpec("fact_observation", "one observation", ("observations",)),
    MartSpec("fact_training_record", "one staff requirement record", ("training_records",)),
    MartSpec("fact_absence", "one staff absence interval", ("absences",)),
    MartSpec("fact_shift", "one planned shift", ("shifts",)),
    MartSpec("fact_invoice", "one Xero invoice", ("xero.invoices",)),
    MartSpec("fact_expense", "one Spendesk expense", ("spendesk.expenses",)),
    MartSpec("mart_service_daily", "service and day", ("fact_visit", "fact_incident")),
    MartSpec("mart_client_daily", "client and day", ("fact_visit", "fact_incident", "fact_medication_task")),
    MartSpec("mart_staff_readiness", "staff, service and day", ("fact_shift", "fact_absence", "fact_training_record")),
    MartSpec("mart_visit_exceptions", "one material visit exception", ("fact_visit",)),
    MartSpec("mart_medication_exceptions", "one material medication exception", ("fact_medication_task",)),
    MartSpec("mart_incident_assurance", "service, day and category", ("fact_incident",)),
    MartSpec("mart_training_compliance", "service, staff and requirement", ("fact_training_record", "app.competency_requirements")),
    MartSpec("mart_package_finance", "client package and accounting period", ("fact_visit", "fact_invoice", "fact_expense")),
    MartSpec("mart_quality_statement_evidence", "statement, service and review period", ("app.evidence", "app.metric_snapshots")),
    MartSpec("mart_action_status", "service, day and action state", ("app.actions",)),
)

MART_CATALOGUE = tuple(spec.name for spec in MART_SPECS)
