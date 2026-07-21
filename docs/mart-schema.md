# Muve mart schema design

This is the first Phase-1 artifact. Snowflake remains read-only; only approved fields enter run-scoped staging. Every promoted row carries `source_run_id`, `source_updated_at`, `loaded_at`, `source_watermark`, and `definition_version`.

| Object | Grain | Approved source mapping | First consumers |
|---|---|---|---|
| `dim_organisation` | one legal organisation | app organisation registry | global context |
| `dim_location` | one regulated location | Birdie services + app location map | assurance |
| `dim_service` | one support service | Birdie services | all workspaces |
| `dim_client` | one active person code | Birdie clients | Client 360 |
| `dim_staff` | one active caregiver | Birdie caregivers | workforce |
| `dim_payer` | one approved payer | Xero contacts + app map | finance |
| `dim_calendar` | one calendar date | generated calendar | all trends |
| `fact_visit` | one scheduled visit | Birdie visits | delivery |
| `fact_care_task` | one due care task | Birdie care tasks | operations |
| `fact_medication_task` | one due medication task | Birdie medication tasks | medicines |
| `fact_incident` | one alert-anchored incident | Birdie alerts/concerns | safety |
| `fact_restrictive_intervention` | one reviewed intervention | Birdie observations + app classification | PBS |
| `fact_observation` | one observation | Birdie observations | Client 360 |
| `fact_training_record` | one staff-requirement record | Birdie training | workforce |
| `fact_absence` | one staff absence interval | Birdie absence | capacity |
| `fact_shift` | one planned staff shift | Birdie rota | safe staffing |
| `fact_invoice` | one Xero invoice | Xero snapshots | finance |
| `fact_expense` | one Spendesk expense | Spendesk snapshots | finance |
| `mart_service_daily` | service/day | conformed care facts | Command Centre |
| `mart_client_daily` | client/day | care facts + app actions | Client 360 |
| `mart_staff_readiness` | staff/service/day | shifts, training, absence | workforce |
| `mart_visit_exceptions` | material visit exception | `fact_visit` | operations |
| `mart_medication_exceptions` | material medication exception | `fact_medication_task` | operations |
| `mart_incident_assurance` | service/day/category | `fact_incident` | governance |
| `mart_training_compliance` | service/staff/requirement | training + requirement map | workforce |
| `mart_package_finance` | client package/accounting period | visits + invoices + expenses | finance |
| `mart_quality_statement_evidence` | statement/service/review period | approved metric snapshots + evidence | assurance |
| `mart_action_status` | service/day/status | app actions | actions |

## Promotion contract

Runs are keyed by source, domain and watermark. They extract approved columns, stage in a run namespace, validate schema/uniqueness/relationships/counts/null coverage/domain rules, build affected objects, and atomically promote the dataset pointer. A failed run leaves the last-good version active. Live relations are never truncated.
