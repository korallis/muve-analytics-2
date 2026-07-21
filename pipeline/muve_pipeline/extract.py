from __future__ import annotations

from collections.abc import Iterator
from datetime import datetime, timezone
from typing import Any

import dlt
import snowflake.connector

from .catalogue import SOURCE_CATALOGUE, SourceSpec
from .config import PipelineConfig


def _rows(config: PipelineConfig, spec: SourceSpec, watermark: str) -> Iterator[dict[str, Any]]:
    connection = snowflake.connector.connect(
        account=config.snowflake_account,
        user=config.snowflake_user,
        password=config.snowflake_password,
        warehouse=config.snowflake_warehouse,
        database=config.snowflake_database,
        schema=config.snowflake_schema,
    )
    fields = ", ".join(f'"{field.upper()}"' for field in spec.approved_fields)
    # Identifiers only come from SOURCE_CATALOGUE; the watermark remains parameterised.
    query = (
        f'SELECT {fields} FROM "{config.snowflake_database}".'
        f'"{config.snowflake_schema}"."{spec.table.upper()}" '
        f'WHERE "{spec.watermark_column.upper()}" >= %s '
        f'ORDER BY "{spec.watermark_column.upper()}"'
    )
    try:
        cursor = connection.cursor(snowflake.connector.DictCursor)
        cursor.execute(query, (watermark,))
        while batch := cursor.fetchmany(5_000):
            for row in batch:
                yield {key.lower(): value for key, value in row.items()}
    finally:
        connection.close()


def birdie_resources(config: PipelineConfig, watermark: str):
    for spec in SOURCE_CATALOGUE:
        @dlt.resource(
            name=f"stg_{spec.table}",
            primary_key=spec.primary_key,
            write_disposition="merge",
        )
        def resource(current: SourceSpec = spec):
            yield from _rows(config, current, watermark)

        yield resource


def next_watermark() -> str:
    return datetime.now(timezone.utc).isoformat()
