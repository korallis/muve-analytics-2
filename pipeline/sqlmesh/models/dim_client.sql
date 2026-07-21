MODEL (
  name marts.dim_client,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key client_id),
  grain client_id,
  audits (unique_values(columns := (client_id)), not_null(columns := (client_id, service_id)))
);

SELECT
  id AS client_id,
  id AS display_code,
  service_id,
  status = 'active' AS active,
  updated_at AS source_updated_at,
  @run_start AS loaded_at,
  CAST(updated_at AS TEXT) AS watermark,
  '1.0.0' AS definition_version
FROM staging.stg_clients
WHERE updated_at BETWEEN @start_ts AND @end_ts;
