# Phase 3 — Assurance depth, workforce and finance report

**Verdict: GREEN**

## Stories shipped

| Story | Status | Evidence |
|---|---|---|
| E4.5 | Green | [E4.5 evidence](./E4.5/EVIDENCE.md) |
| E4.6 | Green | [E4.6 evidence](./E4.6/EVIDENCE.md) |
| E4.7 | Green | [E4.7 evidence](./E4.7/EVIDENCE.md) |
| E4.8 | Green | [E4.8 evidence](./E4.8/EVIDENCE.md) |
| E5.6 | Green | [E5.6 evidence](./E5.6/EVIDENCE.md) |
| E5.7 | Green | [E5.7 evidence](./E5.7/EVIDENCE.md) |
| E5.8 | Green | [E5.8 evidence](./E5.8/EVIDENCE.md) |
| E5.9 | Green | [E5.9 evidence](./E5.9/EVIDENCE.md) |
| E6.1 | Green | [E6.1 evidence](./E6.1/EVIDENCE.md) |
| E6.2 | Green | [E6.2 evidence](./E6.2/EVIDENCE.md) |
| E6.3 | Green | [E6.3 evidence](./E6.3/EVIDENCE.md) |
| E6.4 | Green | [E6.4 evidence](./E6.4/EVIDENCE.md) |
| E6.5 | Green | [E6.5 evidence](./E6.5/EVIDENCE.md) |
| E7.1 | Green | [E7.1 evidence](./E7.1/EVIDENCE.md) |
| E7.2 | Green | [E7.2 evidence](./E7.2/EVIDENCE.md) |
| E7.3 | Green | [E7.3 evidence](./E7.3/EVIDENCE.md) |
| E7.4 | Green | [E7.4 evidence](./E7.4/EVIDENCE.md) |
| E7.5 | Green | [E7.5 evidence](./E7.5/EVIDENCE.md) |

## Phase-exit browser journey

A real persona login exercised every dependency workspace with anonymised fixtures. Each page passed an axe scan with zero serious/critical findings, and a cross-scope client request returned 404 before permission detail.

- [phase-exit-01-quality-governance.png](./phase-exit-01-quality-governance.png)
- [phase-exit-02-people-supported-clients-RH-014.png](./phase-exit-02-people-supported-clients-RH-014.png)
- [phase-exit-03-workforce.png](./phase-exit-03-workforce.png)
- [phase-exit-04-finance.png](./phase-exit-04-finance.png)
- [Playwright trace](./phase-exit-trace.zip)

## NFR spot-checks

- Dashboard p95: **4.7 ms** (target <1,000 ms)
- Client drill-down p95: **12.2 ms** (target <2,000 ms)
- AI explicit non-answer full-response p95: **5.7 ms** (first-token target <2,500 ms)
- Availability probe: 20/20 dashboard and 20/20 drill-down responses successful
- Accessibility: Playwright + axe, zero serious/critical violations on phase routes

## Open caveats

No production PII was used. External source credentials and regulator/owner production sign-off remain environment-controlled cutover inputs; their adapter, audit, fallback and evidence contracts are implemented and validated with anonymised fixtures.
