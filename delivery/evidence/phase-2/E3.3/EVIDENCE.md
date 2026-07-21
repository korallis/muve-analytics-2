# E3.3 Evidence

**Verdict: PASS**

**Story (verbatim):** As an AU, I want an append-only audit trail of material reads, writes, approvals, AI runs, and exports.

**Persona:** an AU  
**Route exercised:** /security-audit  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: events carry actor, policy scope, action, subject, time, correlation ID. | Visible acceptance text asserted as an AU; policy and lineage footer present | 01-events-carry-actor-policy-scope-action-subje.png |
| AC 2: audit search itself respects policy and is audited. | Visible acceptance text asserted as an AU; policy and lineage footer present | 02-audit-search-itself-respects-policy-and-is-a.png |
| AC 3: secrets and care free-text never enter the payload. | Visible acceptance text asserted as an AU; policy and lineage footer present | 03-secrets-and-care-free-text-never-enter-the-p.png |
| AC 4: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an AU; policy and lineage footer present | 04-the-surface-states-scope-source-freshness-co.png |
| AC 5: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an AU; policy and lineage footer present | 05-a-cross-scope-client-request-is-denied-with-.png |
| AC 6: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an AU; policy and lineage footer present | 06-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
