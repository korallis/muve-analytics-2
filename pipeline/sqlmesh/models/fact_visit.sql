MODEL (
  name marts.fact_visit,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key visit_id),
  grain visit_id
);

SELECT id AS visit_id, client_id, service_id, scheduled_start, actual_start, outcome,
  updated_at AS source_updated_at, @run_start AS loaded_at,
  CAST(updated_at AS TEXT) AS watermark, '1.1.0' AS definition_version
FROM staging.stg_visits
WHERE updated_at BETWEEN @start_ts AND @end_ts;
