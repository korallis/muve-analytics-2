# E8.4 Evidence

**Verdict: PASS**

**Story (verbatim):** As an SA, I want all AI spend tagged per-feature with monthly budget caps in the Gateway.

**Persona:** an SA  
**Route exercised:** /ai-governance  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: zero AWS credentials anywhere. | Visible acceptance text asserted as an SA; policy and lineage footer present | 01-zero-aws-credentials-anywhere.png |
| AC 2: PII sent server-side only, never logged. | Visible acceptance text asserted as an SA; policy and lineage footer present | 02-pii-sent-server-side-only-never-logged.png |
| AC 3: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an SA; policy and lineage footer present | 03-the-surface-states-scope-source-freshness-co.png |
| AC 4: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an SA; policy and lineage footer present | 04-a-cross-scope-client-request-is-denied-with-.png |
| AC 5: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an SA; policy and lineage footer present | 05-material-reads-changes-approvals-or-exports-.png |
| AI guardrail: citations and explicit insufficient-evidence non-answer | Rendered chat assertion | 99-insufficient-evidence-with-citation.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
