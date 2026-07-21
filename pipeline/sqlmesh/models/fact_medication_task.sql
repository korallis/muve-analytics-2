MODEL (
  name marts.fact_medication_task,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key task_id),
  grain task_id
);

SELECT id AS task_id, client_id, scheduled_at, outcome, risk_level,
  updated_at AS source_updated_at, @run_start AS loaded_at,
  CAST(updated_at AS TEXT) AS watermark, '1.0.0' AS definition_version
FROM staging.stg_medication_tasks
WHERE updated_at BETWEEN @start_ts AND @end_ts;
