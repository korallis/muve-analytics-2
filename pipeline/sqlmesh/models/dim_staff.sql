MODEL (
  name marts.dim_staff,
  kind INCREMENTAL_BY_UNIQUE_KEY (unique_key staff_id),
  grain staff_id
);

SELECT id AS staff_id, display_name, role, status = 'active' AS active,
  updated_at AS source_updated_at, @run_start AS loaded_at,
  CAST(updated_at AS TEXT) AS watermark, '1.0.0' AS definition_version
FROM staging.stg_caregivers
WHERE updated_at BETWEEN @start_ts AND @end_ts;
