# E5.6 Evidence

**Verdict: PASS**

**Story (verbatim):** As an RM, I want setting-aware legal authorisations: service setting determines available routes, so supported-living cases are never mislabelled as DoLS; capacity assessment, best-interest decision, restrictions, and the authorisation itself are separate records.

**Persona:** an RM  
**Route exercised:** /people-supported/clients/RH-014  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: expiry pipeline (active / pending / expiring 7/30 days) with document storage and renewal actions auto-raised at T-30. | Visible acceptance text asserted as an RM; policy and lineage footer present | 01-expiry-pipeline-active-pending-expiring-7-30.png |
| AC 2: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an RM; policy and lineage footer present | 02-the-surface-states-scope-source-freshness-co.png |
| AC 3: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an RM; policy and lineage footer present | 03-a-cross-scope-client-request-is-denied-with-.png |
| AC 4: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an RM; policy and lineage footer present | 04-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
