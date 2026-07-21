# Phase 4 — AI breadth report

**Verdict: GREEN**

## Stories shipped

| Story | Status | Evidence |
|---|---|---|
| E5.10 | Green | [E5.10 evidence](./E5.10/EVIDENCE.md) |
| E8.5 | Green | [E8.5 evidence](./E8.5/EVIDENCE.md) |
| E8.6 | Green | [E8.6 evidence](./E8.6/EVIDENCE.md) |
| E8.7 | Green | [E8.7 evidence](./E8.7/EVIDENCE.md) |
| E8.8 | Green | [E8.8 evidence](./E8.8/EVIDENCE.md) |
| E9.4 | Green | [E9.4 evidence](./E9.4/EVIDENCE.md) |
| E10.3 | Green | [E10.3 evidence](./E10.3/EVIDENCE.md) |

## Phase-exit browser journey

A real persona login exercised every dependency workspace with anonymised fixtures. Each page passed an axe scan with zero serious/critical findings, and a cross-scope client request returned 404 before permission detail.

- [phase-exit-01-people-supported-clients-RH-014.png](./phase-exit-01-people-supported-clients-RH-014.png)
- [phase-exit-02-ai-governance.png](./phase-exit-02-ai-governance.png)
- [phase-exit-03-actions.png](./phase-exit-03-actions.png)
- [phase-exit-04-delivery-readiness.png](./phase-exit-04-delivery-readiness.png)
- [Playwright trace](./phase-exit-trace.zip)

## NFR spot-checks

- Dashboard p95: **4.7 ms** (target <1,000 ms)
- Client drill-down p95: **12.2 ms** (target <2,000 ms)
- AI explicit non-answer full-response p95: **5.7 ms** (first-token target <2,500 ms)
- Availability probe: 20/20 dashboard and 20/20 drill-down responses successful
- Accessibility: Playwright + axe, zero serious/critical violations on phase routes

## Open caveats

No production PII was used. External source credentials and regulator/owner production sign-off remain environment-controlled cutover inputs; their adapter, audit, fallback and evidence contracts are implemented and validated with anonymised fixtures.
