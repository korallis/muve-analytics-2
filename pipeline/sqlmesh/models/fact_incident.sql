MODEL (
  name marts.fact_incident,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key incident_id),
  grain incident_id
);

SELECT id AS incident_id, client_id, service_id, occurred_at, reported_at, category, status,
  updated_at AS source_updated_at, @run_start AS loaded_at,
  CAST(updated_at AS TEXT) AS watermark, '1.0.0' AS definition_version
FROM staging.stg_incidents
WHERE updated_at BETWEEN @start_ts AND @end_ts;
