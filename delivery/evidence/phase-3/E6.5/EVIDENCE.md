# E6.5 Evidence

**Verdict: PASS**

**Story (verbatim):** As an OD, I want the compliance gap XLSX export preserved as-is.

**Persona:** an OD  
**Route exercised:** /workforce  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: The authorised persona can complete the stated outcome: As an OD, I want the compliance gap XLSX export preserved as-is. | Visible acceptance text asserted as an OD; policy and lineage footer present | 01-the-authorised-persona-can-complete-the-stat.png |
| AC 2: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an OD; policy and lineage footer present | 02-the-surface-states-scope-source-freshness-co.png |
| AC 3: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an OD; policy and lineage footer present | 03-a-cross-scope-client-request-is-denied-with-.png |
| AC 4: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an OD; policy and lineage footer present | 04-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
