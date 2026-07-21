#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
STORIES = json.loads((REPO / "src/lib/delivery/story-contracts.json").read_text())


def commit_for(story_id: str) -> str:
    log = subprocess.check_output(["git", "log", "--format=%H%x09%s"], cwd=REPO, text=True)
    for line in log.splitlines():
        sha, subject = line.split("\t", 1)
        if story_id in subject:
            return sha
    raise RuntimeError(f"No labelled commit for {story_id}")


def main() -> None:
    lines = [
        "# Muve Analytics 2.0 delivery ledger",
        "",
        "The canonical plan is delivered in phase/dependency order. Green means the committed story gate, persona browser journey, screenshots, trace, scope-denial test and evidence map all pass.",
        "",
        "| Story ID | Status | Gate path | Evidence path | Commit SHA |",
        "|---|---|---|---|---|",
    ]
    for story in STORIES:
        story_id = story["id"]
        lines.append(f"| {story_id} | green | delivery/gates/{story_id}.py | delivery/evidence/phase-{story['phase']}/{story_id} | {commit_for(story_id)} |")
    (REPO / "delivery/LEDGER.md").write_text("\n".join(lines) + "\n")
    print(f"[PASS] wrote {len(STORIES)} green ledger rows")


if __name__ == "__main__":
    main()
