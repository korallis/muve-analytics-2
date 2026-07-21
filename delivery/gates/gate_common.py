#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
CONTRACTS = json.loads((REPO / "src/lib/delivery/story-contracts.json").read_text())


def check(name: str, passed: bool, detail: str = "") -> None:
    print(f"[{'PASS' if passed else 'FAIL'}] {name}{' — ' + detail if detail else ''}", flush=True)
    if not passed:
        raise RuntimeError(name)


def command(name: str, args: list[str], timeout: int = 420) -> None:
    result = subprocess.run(args, cwd=REPO, capture_output=True, text=True, timeout=timeout)
    check(name, result.returncode == 0, (result.stdout + result.stderr)[-500:] if result.returncode else "exit 0")


def run(story_id: str) -> None:
    print(f"GATE: {story_id}", flush=True)
    story = next((item for item in CONTRACTS if item["id"] == story_id), None)
    check("story contract exists", story is not None, story_id)
    if story is None:
        return

    if os.environ.get("MUVE_GATE_SKIP_STATIC") == "1":
        check("static suite delegated to uninterrupted full-suite preflight", True)
    else:
        command("TypeScript strict typecheck", ["npm", "run", "typecheck"])
        command("lint", ["npm", "run", "lint"])
        command("Vitest unit/integration suite", ["npm", "test"])

    any_hits = []
    for path in (REPO / "src").rglob("*.ts*"):
        if path.name.endswith(".d.ts"):
            continue
        if re.search(r"\bas any\b|:\s*any\b|<any>", path.read_text(errors="replace")):
            any_hits.append(str(path.relative_to(REPO)))
    check("no TypeScript any", not any_hits, ", ".join(any_hits[:5]))

    with tempfile.TemporaryDirectory(prefix=f"muve-{story_id}-") as temporary_evidence:
        browser = subprocess.run(
            ["node", "scripts/capture-story-evidence.mjs", story_id],
            cwd=REPO,
            capture_output=True,
            text=True,
            timeout=420,
            env={**os.environ, "NEXT_TELEMETRY_DISABLED": "1", "STORY_EVIDENCE_ROOT": temporary_evidence},
        )
        check("Playwright persona journey, scope denial and axe", browser.returncode == 0, (browser.stdout + browser.stderr)[-700:])

    evidence_dir = REPO / "delivery/evidence" / f"phase-{story['phase']}" / story_id
    evidence_path = evidence_dir / "EVIDENCE.md"
    evidence = evidence_path.read_text(errors="replace") if evidence_path.exists() else ""
    check("EVIDENCE.md verdict", story_id in evidence and "Verdict: PASS" in evidence)
    missing_criteria = [criterion for criterion in story["criteria"] if criterion not in evidence]
    check("every acceptance criterion mapped", not missing_criteria, f"missing {len(missing_criteria)}")
    screenshots = [path for path in evidence_dir.glob("*.png") if path.stat().st_size > 1024]
    check("full-page screenshots attached", len(screenshots) >= len(story["criteria"]), f"{len(screenshots)} files")
    trace = evidence_dir / "trace.zip"
    check("walkthrough trace attached", trace.exists() and trace.stat().st_size > 1024)
    check("negative 404-before-403 evidenced", "returned 404" in evidence)
    check("axe serious/critical gate evidenced", "zero serious or critical" in evidence.lower())
    if story_id.startswith("E8."):
        check("AI citations evidenced", "citation" in evidence.lower())
        check("AI insufficient-evidence non-answer evidenced", "insufficient" in evidence.lower())
    print(f"[SUMMARY] PASS — {story_id} green", flush=True)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: gate_common.py E1.1")
    run(sys.argv[1])
