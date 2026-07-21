from __future__ import annotations

import argparse
import json
import subprocess
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .catalogue import MART_CATALOGUE, SOURCE_CATALOGUE
from .config import PipelineConfig

STATE_FILE = Path(__file__).resolve().parents[1] / ".pipeline-state.json"
SQLMESH_DIR = Path(__file__).resolve().parents[1] / "sqlmesh"


def read_watermark() -> str:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())["watermark"]
    return (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()


def promote_watermark(watermark: str) -> None:
    # Atomic replacement means failed extraction/transformation retains last-good state.
    with tempfile.NamedTemporaryFile("w", dir=STATE_FILE.parent, delete=False) as handle:
        json.dump({"watermark": watermark}, handle)
        temporary = Path(handle.name)
    temporary.replace(STATE_FILE)


def run() -> None:
    import dlt

    from .extract import birdie_resources, next_watermark

    config = PipelineConfig.from_env()
    watermark = read_watermark()
    promoted_watermark = next_watermark()
    pipeline = dlt.pipeline(
        pipeline_name="muve_birdie",
        destination=dlt.destinations.postgres(credentials=config.serving_database_url),
        dataset_name="staging",
    )
    pipeline.run(list(birdie_resources(config, watermark)))
    subprocess.run(
        ["sqlmesh", "plan", "production", "--auto-apply", "--no-prompts"],
        cwd=SQLMESH_DIR,
        check=True,
    )
    promote_watermark(promoted_watermark)
    print(f"[PASS] promoted watermark {promoted_watermark}; {len(MART_CATALOGUE)} marts available")


def main() -> None:
    parser = argparse.ArgumentParser(description="Load approved Birdie Snowflake fields into curated Neon marts")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if args.dry_run:
        print(f"[CHECK] Snowflake sources: {', '.join(spec.table for spec in SOURCE_CATALOGUE)}")
        print(f"[CHECK] SQLMesh marts: {', '.join(MART_CATALOGUE)}")
        print(f"[PASS] watermark state: {read_watermark()}")
        return
    run()


if __name__ == "__main__":
    main()
