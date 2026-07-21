from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class PipelineConfig:
    snowflake_account: str
    snowflake_user: str
    snowflake_password: str
    snowflake_database: str
    snowflake_schema: str
    snowflake_warehouse: str
    serving_database_url: str

    @classmethod
    def from_env(cls) -> "PipelineConfig":
        names = {
            "snowflake_account": "SNOWFLAKE_ACCOUNT",
            "snowflake_user": "SNOWFLAKE_USER",
            "snowflake_password": "SNOWFLAKE_PASSWORD",
            "snowflake_database": "SNOWFLAKE_DATABASE",
            "snowflake_schema": "SNOWFLAKE_SCHEMA",
            "snowflake_warehouse": "SNOWFLAKE_WAREHOUSE",
            "serving_database_url": "DATABASE_URL",
        }
        values = {field: os.environ.get(env, "") for field, env in names.items()}
        missing = [env for field, env in names.items() if not values[field]]
        if missing:
            raise RuntimeError(f"Missing pipeline environment variables: {', '.join(missing)}")
        return cls(**values)
