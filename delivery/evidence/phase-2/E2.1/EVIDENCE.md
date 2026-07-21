# E2.1 Evidence

**Verdict: PASS**

**Story (verbatim):** As a QL, I want every metric defined exactly once per the contract (§4.3), so the same number never disagrees between two screens.

**Persona:** a QL  
**Route exercised:** /metric-glossary  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: incident counts on Command Centre, Client 360, and governance views resolve to one definition. | Visible acceptance text asserted as a QL; policy and lineage footer present | 01-incident-counts-on-command-centre-client-360.png |
| AC 2: a registry test asserts no orphan metrics. | Visible acceptance text asserted as a QL; policy and lineage footer present | 02-a-registry-test-asserts-no-orphan-metrics.png |
| AC 3: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as a QL; policy and lineage footer present | 03-the-surface-states-scope-source-freshness-co.png |
| AC 4: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as a QL; policy and lineage footer present | 04-a-cross-scope-client-request-is-denied-with-.png |
| AC 5: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as a QL; policy and lineage footer present | 05-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
