# E8.1 Evidence

**Verdict: PASS**

**Story (verbatim):** As any user, I want Ask Muve: natural-language questions answered via allowlisted typed tools against the semantic layer.

**Persona:** any user  
**Route exercised:** /ai-governance  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: tools are metric/dimension calls, never free SQL. | Visible acceptance text asserted as any user; policy and lineage footer present | 01-tools-are-metric-dimension-calls-never-free-.png |
| AC 2: every factual claim cites the metrics, period, and data timestamp used. | Visible acceptance text asserted as any user; policy and lineage footer present | 02-every-factual-claim-cites-the-metrics-period.png |
| AC 3: each tool call reauthorises the caller's scope. | Visible acceptance text asserted as any user; policy and lineage footer present | 03-each-tool-call-reauthorises-the-caller-s-sco.png |
| AC 4: insufficient evidence produces an explicit non-answer. | Visible acceptance text asserted as any user; policy and lineage footer present | 04-insufficient-evidence-produces-an-explicit-n.png |
| AC 5: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as any user; policy and lineage footer present | 05-the-surface-states-scope-source-freshness-co.png |
| AC 6: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as any user; policy and lineage footer present | 06-a-cross-scope-client-request-is-denied-with-.png |
| AC 7: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as any user; policy and lineage footer present | 07-material-reads-changes-approvals-or-exports-.png |
| AI guardrail: citations and explicit insufficient-evidence non-answer | Rendered chat assertion | 99-insufficient-evidence-with-citation.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
