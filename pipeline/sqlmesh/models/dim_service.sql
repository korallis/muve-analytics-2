MODEL (
  name marts.dim_service,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key service_id),
  grain service_id
);

SELECT id AS service_id, name, setting, updated_at AS source_updated_at,
  @run_start AS loaded_at, CAST(updated_at AS TEXT) AS watermark,
  '1.0.0' AS definition_version
FROM staging.stg_services
WHERE updated_at BETWEEN @start_ts AND @end_ts;
