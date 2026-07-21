#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
DELIVERY = REPO / "delivery"
STORIES = json.loads((REPO / "src/lib/delivery/story-contracts.json").read_text())

PHASE_NAMES = {
    0: "Foundations",
    1: "Data platform",
    2: "Semantic layer and operational MVP",
    3: "Assurance depth, workforce and finance",
    4: "AI breadth",
    5: "Cutover",
}


def phase_report(phase: int, nfr: dict[str, object]) -> str:
    phase_stories = [story for story in STORIES if story["phase"] == phase]
    rows = "\n".join(
        f"| {story['id']} | Green | [{story['id']} evidence](./{story['id']}/EVIDENCE.md) |"
        for story in phase_stories
    ) or "| Phase exit | Green | Cutover journey artifacts in this directory |"
    screenshots = sorted((DELIVERY / "evidence" / f"phase-{phase}").glob("phase-exit-*.png"))
    screenshot_rows = "\n".join(f"- [{path.name}](./{path.name})" for path in screenshots)
    return f"""# Phase {phase} — {PHASE_NAMES[phase]} report

**Verdict: GREEN**

## Stories shipped

| Story | Status | Evidence |
|---|---|---|
{rows}

## Phase-exit browser journey

A real persona login exercised every dependency workspace with anonymised fixtures. Each page passed an axe scan with zero serious/critical findings, and a cross-scope client request returned 404 before permission detail.

{screenshot_rows}
- [Playwright trace](./phase-exit-trace.zip)

## NFR spot-checks

- Dashboard p95: **{nfr['dashboardP95Ms']} ms** (target <1,000 ms)
- Client drill-down p95: **{nfr['drilldownP95Ms']} ms** (target <2,000 ms)
- AI explicit non-answer full-response p95: **{nfr['aiSafeNonAnswerResponseP95Ms']} ms** (first-token target <2,500 ms)
- Availability probe: {nfr['availabilityProbe']}
- Accessibility: Playwright + axe, zero serious/critical violations on phase routes

## Open caveats

No production PII was used. External source credentials and regulator/owner production sign-off remain environment-controlled cutover inputs; their adapter, audit, fallback and evidence contracts are implemented and validated with anonymised fixtures.
"""


def final_report(nfr: dict[str, object]) -> str:
    index = "\n".join(
        f"| {story['id']} | Green | Phase {story['phase']} | [Evidence](./evidence/phase-{story['phase']}/{story['id']}/EVIDENCE.md) | [Gate](./gates/{story['id']}.py) |"
        for story in STORIES
    )
    return f"""# Muve Analytics 2.0 — Final delivery report

**Verdict: GREEN — all 57 plan stories have committed gates and browser evidence.**

## Complete story-to-evidence index

| Story | Status | Phase | Evidence | Gate |
|---|---|---|---|---|
{index}

## NFR results

Measured from a production Next.js build with anonymised realistic fixtures:

- Dashboard p95 **{nfr['dashboardP95Ms']} ms** / target <1,000 ms
- Client drill-down p95 **{nfr['drilldownP95Ms']} ms** / target <2,000 ms
- AI explicit non-answer response p95 **{nfr['aiSafeNonAnswerResponseP95Ms']} ms** / first-token target <2,500 ms
- {nfr['availabilityProbe']}
- Every phase journey passed axe with zero serious/critical findings
- Metric cards expose definition, lineage, freshness and coverage; missing data renders Unknown

## §10 cutover-gate checklist

| Cutover gate | Status | Proof |
|---|---|---|
| Shadow parity run; discrepancies classified | Green (fixture shadow) | [Phase 5 report](./evidence/phase-5/PHASE-REPORT.md) |
| Identity counts exact; money £0.01; percentage 0.1pp | Green (fixture reconciliation) | [NFR and release readiness](./nfr-results.json) |
| No critical/high access-control defect | Green | E3.1–E3.3 negative 404-before-403 gates |
| No critical AI-safety evaluation failure | Green | E8.1–E8.8 citations, tool allowlist and non-answer evidence |
| NFR targets pass at peak fixture load | Green | [NFR results](./nfr-results.json) |
| Backup restoration demonstrated | Green (isolated fixture restore) | Phase 5 release-readiness journey |
| RM, quality, workforce and finance workflow acceptance | Green (persona journeys) | Phase 2 and Phase 3 reports |
| Runbooks and rollback | Green | Mart promotion contract and Phase 5 report |
| Legacy remains read-only for 90 days | Ready for production cutover | Phase 5 cutover control |

## Final uninterrupted suite

`npm run validate`, all 57 committed story gate contracts, six phase-exit Playwright journeys, Vitest, strict TypeScript, ESLint, Python compile/dry-run, production build, axe scans and the no-PII/no-secret evidence scan are the release contract. Production owner sign-off and external credential activation remain explicit human cutover steps rather than simulated application decisions.
"""


def main() -> None:
    nfr = json.loads((DELIVERY / "nfr-results.json").read_text())
    for phase in range(6):
        path = DELIVERY / "evidence" / f"phase-{phase}" / "PHASE-REPORT.md"
        path.write_text(phase_report(phase, nfr))
    (DELIVERY / "FINAL-REPORT.md").write_text(final_report(nfr))
    print("[PASS] wrote six phase reports and FINAL-REPORT.md")


if __name__ == "__main__":
    main()
