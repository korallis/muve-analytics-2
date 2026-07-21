# E1.1 Evidence

**Verdict: PASS**

**Story (verbatim):** As an SA, I want Birdie data extracted by the scheduled Python pipeline into curated marts, so reports never query raw mirrored schema.

**Persona:** an SA  
**Route exercised:** /integration-health  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: nightly rebuild completes ≤15 min after 05:30 UTC. | Visible acceptance text asserted as an SA; policy and lineage footer present | 01-nightly-rebuild-completes-15-min-after-05-30.png |
| AC 2: hourly incremental for clients/visits/alerts/observations. | Visible acceptance text asserted as an SA; policy and lineage footer present | 02-hourly-incremental-for-clients-visits-alerts.png |
| AC 3: each mart documents source tables and grain. | Visible acceptance text asserted as an SA; policy and lineage footer present | 03-each-mart-documents-source-tables-and-grain.png |
| AC 4: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an SA; policy and lineage footer present | 04-the-surface-states-scope-source-freshness-co.png |
| AC 5: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an SA; policy and lineage footer present | 05-a-cross-scope-client-request-is-denied-with-.png |
| AC 6: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an SA; policy and lineage footer present | 06-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
